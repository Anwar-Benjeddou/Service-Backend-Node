const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas: 
 *     facture:
 *       type: object
 *       properties:
 *
 *         colis:
 *          type: string
 *          description: The colis's id.
 *          example: zone 2 
 *         provider:
 *          type: string
 *          description: The provider's id.
 *          example: zone 2 
 *         payment_status_provider:
 *          type: integer
 *          description: if provider paid status=1 else 0.
 *          example:  0
 *         payment_status_customer:
 *          type: string
 *          description: if customer paid status=1 else 0.
 *          example:  0
 *         prefacture_status:
 *          type: string
 *          description: if all status provider, customer = 1 do prefacture 1 then the facture can't updated.
 *          example:  0
 *         mode_payment:
 *          type: integer
 *          description: if the customer has already paid the price of the product do mode_payment= 1 else 0
 *          example:  1
 */

/**
 * @swagger
 * /facture/{id}:
 *   get:
 *     summary: Retrieve a  list of facture by provider.
 *     description: Retrieve a facture.
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the provider to retrieve facture.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: factures fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get("/facture/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const article = (await app.db.table("article")).reduce(
      (a, e) => ({ ...a, [e.id]: e.article }),
      {}
    );

    const colis = (await app.db("colis")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const scale = (
      await app.db.table("scale").where("provider", "=", req.params.id)
    )
      .map((e) => ({ ...e, article: article[e.article] }))
      .reduce((a, e) => ({ ...a, [e.article]: e.price_initial }), {});

    const rows1 = (
      await app.db
        .from("facture")
        .select("*")
        .where("provider", "=", req.params.id)
        .andWhere("payment_status_provider", "=", 0)
        .andWhere("payment_status_driver", "=", 1)


    ).map((e) => ({ ...e, colis: colis[e.colis] }));

    const rows2 = (
      await app.db
        .from("facture")
        .select("*")
        .where("provider", "=", req.params.id)
        .andWhere("delivery_status", "=", 0)
        .andWhere("payment_status_provider", "=", 0)

    ).map((e) => ({ ...e, colis: colis[e.colis] }));
    if (rows1.length === 0 && rows2.length === 0) {
      return res.json({
        message: "facture not found with the given id",
        status: 200,
        data: rows2,
      });
    }

    res.json({
      message: "facture fetched with the given id",
      status: 200,
      data: { rows1, rows2, scale },
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});

/**
 * @swagger
 * /facture/to_paid:
 *   put:
 *     summary: update status payment provider to paid (status=1).
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *             provider:
 *               type: string
 *               example:  ""
 *             frais_total:
 *               type: double
 *               example:  
 *             nb_colis:
 *               type: double
 *               example:  0
  *             total_livraision:
 *               type: double
 *               example:  0
 *             facture:
 *               type: array
 *               example:  [{"id_facture":"", "frais_livraision": 0}]
 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *             provider:
 *               type: string
 *               example:  ""
 *             frais_total:
 *               type: double
 *               example:  
 *             nb_colis:
 *               type: double
 *               example:  ""
 *             factures:
 *               type: array
 *               example:  [ {id_facture:"", frais_livraision: 0}]
 

 */
app.put("/facture/to_paid", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const user = req.userId;

    app.db
      .transaction(async (trx) => {
        const { factures, provider, frais_total, nb_colis, total_livraision } =
          req.body;
        const [num_facture_setting] = await app
          .db("setting")
          .select("num_facture", "id");

        const code_facture =
          "DETAIL-RECETTE-" + parseInt(num_facture_setting.num_facture) + 1;
        if (num_facture_setting) {
          await trx
            .table("setting")
            .update({
              num_facture: parseInt(num_facture_setting.num_facture) + 1,
            })
            .where("id", "=", num_facture_setting.id);
        }
        const facture_insert = factures.map((facture) => {
          let data, ids;
          data = {
            payment_status_provider: 1,
            prefacture_status: 1,
            updated_at: new Date(),
            code: code_facture,
            frais_livraision: facture.frais_livraision,
          };
          ids = facture.id_facture;
          return { data, ids };
        });
        facture_insert.map(async (fact) => {
          await trx("facture").update(fact.data).where("id", "=", fact.ids);
        });

        await trx.table("facture_provider").insert({
          id: uuid.v1().toLocaleUpperCase(),
          code_facture: code_facture,
          frais_total: frais_total,
          nb_colis: nb_colis,
          frais_livraision: total_livraision,
          provider: provider,
        });
        const colis_infos = await trx
          .table("facture")
          .select("*")
          .where(
            "id",
            "IN",
            factures.map((facture) => facture.id_facture)
          );


        await trx
          .table("colis")
          .update({ etat_final: 1, updated_at: new Date() })
          .where("id", "IN", colis_infos.map(el => el.colis));

        const colis_history = colis_infos.map((colis_info) => {
          return {
            id: uuid.v1().toLocaleUpperCase(),
            action: colis_info.id,
            colis: colis_info.colis,
            actionneurs: user,
            agence: req.agence,
            event: "colis facturé",
          };
        });
        await trx("colis_history").insert(colis_history);
      })
      .then(() => {
        res.status(201).json({
          message: "Successfully updated colis",
          status: 201,
          data: req.body,
        });
      })
      .catch((err) => {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /facture_code/{code}:
 *   get:
 *     summary: Retrieve a  list of facture by code.
 *     description: Retrieve a facture.
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: String ID of the code to retrieve facture.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: facture fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get(
  "/facture_code/:code",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const colis = (await app.db("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const pre_facture = (
        await app.db("facture").where("code", "=", req.params.code)
      ).map((e) => ({ ...e, colis: colis[e.colis] }));
      /* .reduce((a, e) => ({ ...a, [e.id]: e }), {}); */

      const rows = (
        await app.db
          .from("facture_provider")
          .select("*")
          .where("code_facture", "=", req.params.code)
      ).map((e) => ({ ...e, code_facture: pre_facture }));
      console.log(rows);

      if (rows.length === 0) {
        return res.json({
          message: "facture not found with the given id",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "facture fetched with the given id",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * /facture/driver/set_money:
 *   put:
 *     summary: driver set money to admin.
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *             driver:
 *               type: string
 *               example:  ""
 *             frais:
 *               type: double
 *               example:  

 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *             driver:
 *               type: string
 *               example:  ""
 *             frais:
 *               type: double
  */
app.put(
  "/facture/driver/set_money",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { driver, frais } = req.body;
          const [driver_info] = await trx
            .table("driver")
            .select("frais_livraision")
            .where("id", "=", driver);
          await trx
            .table("driver")
            .update({ frais_livraision: driver_info.frais_livraision - frais })
            .where("id", "=", driver);

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            vu_provider: 1,
            actionneurs: req.userId,
            agence: req.agence,
            event: `chauffeur payé +${frais}`,
          });
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 201,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /facture/final:
 *   put:
 *     summary: update status payment facture (status=2).
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *
 *             facture:
 *               type: sring
 *               example:  
 *               description: ID facture de table factue_provider
 * 
 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 

 */
app.put(
  "/facture/final",
  [authJwt.verifyToken], async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { facture, mode_payment, order } = req.body;

          await trx
            .table("facture_provider")
            .update({ status_facture: 1, mode_payment: mode_payment, order: order, updated_at: new Date() })
            .where("id", "=", facture);


        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 201,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /facture/final/status:
 *   get:
 *     summary: list  facture.
 *     description: ist of all facture
 *     tags:
 *       - facture
 *     parameters:
 *         - in: query
 *           name: driver
 *           schema:
 *             type: string
 *           description: The ID driver
 *         - in: query
 *           name: current_page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: per_page
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *         - in: query
 *           name: order_by_column
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/facture/final/status",
  /*   [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      )
        /* .where("agence", "=", agence_user) */
        .reduce(
          (a, e) => ({
            ...a,
            [e.id]: e,
          }),
          {}
        );

      console.log(provider);
      const rows = (await app.db.table("facture_provider").select("*")).map(
        (e) => ({
          ...e,
          provider: provider[e.provider],
        })
      );
      console.log(rows);

      return res.json({
        message: "facture not found with the given id",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /provider/facture/final/status:
 *   get:
 *     summary: list  facture by provider.
 *     description: ist of all facture
 *     tags:
 *       - facture
 *     parameters:
 *         - in: query
 *           name: driver
 *           schema:
 *             type: string
 *           description: The ID driver
 
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/provider/facture/final/status",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const rows = (
        await app.db
          .table("facture_provider")
          .select("*")
          .where("provider", "=", req.userId)
      ).map((e) => ({
        ...e,
      }));

      return res.json({
        message: "facture not found with the given id",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /factures/status/code/{code}:
 *   get:
 *     summary: list  facture by code.
 *     description: ist of all facture
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: String Code of the provider to retrieve facture.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/factures/status/code/:code",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const colis = (await app.db("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const rows = (
        await app.db
          .from("facture")
          .select("*")
          .where("code", "=", req.params.code)

          .andWhere("payment_status_provider", "=", 1)
      ).map((e) => ({ ...e, colis: colis[e.colis] }));

      if (rows.length === 0) {
        return res.json({
          message: "facture not found with the given code",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "facture fetched with the given code",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);
/**
 * @swagger
 * /factures/status/code/{code}:
 *   get:
 *     summary: list  facture by code.
 *     description: ist of all facture
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: String Code of the provider to retrieve facture.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/factures/status/code/provider/:code",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {


      const provider = (
        await app.db.table("provider as p").join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      const rows = (
        await app.db
          .from("facture_provider")
          .select("*")
          .where("code_facture", "=", req.params.code)
      ).map((e) => ({ ...e, provider: provider[e.provider] }))
      if (rows.length === 0) {
        return res.json({
          message: "facture not found with the given code",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "facture fetched with the given code",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * /facture/driver/to_paid:
 *   put:
 *     summary: update status payment driver to paid (status=1).
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
*             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 
 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 

   
 *             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 

 */
app.put(
  "/facture/driver/to_paid",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      app.db
        .transaction(async (trx) => {
          const { factures, colis } = req.body;

          const facture_insert = factures.map((facture) => {
            let data, ids;
            data = {
              payment_status_driver: 1,
              updated_at: new Date(),
            };
            ids = facture;
            return { data, ids };
          });
          facture_insert.map(async (fact) => {
            await trx("facture").update(fact.data).where("id", "=", fact.ids);
          });
          const id_delivery = await trx("delivery")
            .select("*")
            .pluck("id")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );
          await trx("delivery")
            .update({
              etat_payment: 1,
              updated_at: new Date(),
            })
            .where(
              "id",
              "IN",
              id_delivery.map((e) => e)
            );

          const colis_infos = await trx
            .table("facture")
            .select("*")
            .where(
              "id",
              "IN",
              factures.map((facture) => facture)
            );
          const colis_history = colis_infos.map((colis_info) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: colis_info.id,
              colis: colis_info.colis,
              actionneurs: user,
              agence: req.agence,
              event: "driver paid",
              vu_provider: 1,
            };
          });
          await trx("colis_history").insert(colis_history);
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 201,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @swagger
 * /facture/provider/to_paid:
 *   put:
 *     summary: update status payment provider to paid (status=1).
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
*             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 
 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 

   
 *             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 

 */
app.put(
  "/facture/provider/to_paid",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          console.log(req.body)

          await trx("facture").update({
            payment_status_driver: 1,
            updated_at: new Date(),
          }).where(
            "colis",
            "IN",
            colis.map((e) => e)
          );;

          await trx("delivery")
            .update({
              etat_payment: 1,
              updated_at: new Date(),
            })
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const colis_infos = await trx
            .table("facture")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((facture) => facture)
            );
          const colis_history = colis_infos.map((colis_info) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: colis_info.id,
              colis: colis_info.colis,
              actionneurs: user,
              agence: req.agence,
              event: "driver paid",
              vu_provider: 1,
            };
          });
          await trx("colis_history").insert(colis_history);
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 201,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
    }
  }
);
/**
 * @swagger
 * /facture/delivery/driver/not_paid/{id}:
 *   get:
 *     summary: Retrieve a list of colis by id for change status_ayment_driver to 1 and eta_payment=>1
 *     description: Retrieve a list of colis .
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the driver to retrieve.
 *     responses:
 *       200:
 *         description: A list of colis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/delivery'
 *       500:
 *         description : Internal server
 */
app.get(
  "/facture/delivery/driver/not_paid/:id",
  /*  [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const delivery = await app.db
        .table("delivery")
        .select("*")
        .pluck("colis")
        .where("driver", "=", req.params.id)
        .andWhere("etat_payment", "=", 0)
        .andWhere("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0);
      let result = [];
      console.log("here1");
      if (delivery.length === 0) {
        return res.json({
          message: "colis   not found  ",
          status: 200,
          data: result,
        });
      } else {
        console.log("here2");
        result = (
          await app
            .db("facture")
            .where("payment_status_driver", "=", 0)
            .andWhere(
              "colis",
              "IN",
              delivery.map((e) => e)
            )
        ).map((e) => ({
          ...e,

          colis: coliss[e.colis],
        }));
        res.json({
          message: "colis fetched",
          status: 200,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /test_delete/{id}:
 *   delete:
 *     summary: Delete invoice.
 *     description: delete invoice.
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of invoice to delete .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: invoice deleted
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.delete("/test_delete/:id",/*  [authJwt.verifyToken], */ async (req, res, next) => {
  try {

    if (req.params.id) {
      await app.db("facture")
        .delete()
        .where("id", "=", req.params.id)
        .then(() => {
          console.log("here")
        })

      res.json({
        message: "invoice deleted",
        status: 200,
        data: ""

      })


    }

    else {
      res.json({
        message: "invoice deleted",
        status: 200,
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});





/**
 * @swagger
 * /facture/set/chechNum:
 *   put:
 *     summary: update mode payment factur.
 *     tags:
 *       - facture
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
*             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 
 
 *     responses:
 *       201:
 *         description: invoiced colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
   
 *             colis:
 *               type: string
 *               example:  []
 *             factures:
 *               type: array
 *               example:  [ ]
 
 */
app.put(
  "/facture/set/chechNum",
/*   [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { facture, numero_check } = req.body;
          if (facture && numero_check) {
            await trx
              .table("facture")
              .update({ numero_check: numero_check, updated_at: new Date() })
              .where("id", "=", facture);
          }

        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 201,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /provider/delivery/done/list:
 *   get:
 *     summary: Retrieve a list of colis for each provider when status is 2 (livraision terminé).
 *     description: list of colis for each provider.
 *     tags:
 *       - delivery
 *     parameters:
 *         - in: query
 *           name: current_page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: per_page
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *         - in: query
 *           name: order_by_column
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *     responses:
 *       200:
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */
app.get(
  "/facture/delivery/provider/not_paid/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const delivery = await app.db
        .table("delivery")
        .select("*")
        .pluck("colis")
        .andWhere("etat_payment", "=", 0)
        .andWhere("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0);
      let result = [];
      console.log("here1");
      if (delivery.length === 0) {
        return res.json({
          message: "colis   not found  ",
          status: 200,
          data: result,
        });
      } else {
        console.log("here2");
        result = (
          await app
            .db("facture")
            .where("payment_status_driver", "=", 0)
            .where("provider", "=", req.params.id)
            .andWhere(
              "colis",
              "IN",
              delivery.map((e) => e)
            )
        ).map((e) => ({
          ...e,

          colis: coliss[e.colis],
        }));
        res.json({
          message: "colis fetched",
          status: 200,
          data: result,
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
