const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");
const _ = require("lodash");

/**
 * @swagger
 * /return/to_provider/list:
 *   get:
 *     summary: Retrieve a list of return colis
 *     description: Retrieve a list of return colis .
 *     tags:
 *       - mobile_return_driver
 *     responses:
 *       200:
 *         description: A list of colis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/colis'
 *       500:
 *         description : Internal server
 */
app.get(
  "/return/to_provider/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
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

      const user = req.userId;

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const retour = (
        await app.db.table("retour_provider ").where("driver", "=", user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));

      if (retour.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
          status: 200,
          data: retour,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: retour,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /retour/to_ongoing/provider:
 *   put:
 *     summary: update status retour to ongoing (status=1).
 *     tags:
 *       - mobile_return_driver
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
 *               type: array
 *               example:  [ ]
 
 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
app.put(
  "/retour/to_ongoing/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const retour = await trx
            .table("retour_provider")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const update_retour = retour.map(() => {
            return {
              retour_status: 1,
              updated_at: new Date(),
            };
          });

          let compt = 0;
          await trx
            .table("retour_provider")
            .update(update_retour[compt++])
            .where(
              "id",
              "IN",
              retour.map((colis) => colis.id)
            );
          const history = retour.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "retour vers provider en cours",
            };
          });
          await trx.table("colis_history").insert(history);
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 200,
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
 * /retour/to_done/provider:
 *   put:
 *     summary: update status retour to done (status=2).
 *     tags:
 *       - mobile_return_driver
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
 *               type: array
 *               example:  [ ]
 
 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
app.put(
  "/retour/to_done/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const retour = await trx
            .table("retour_provider")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );
         if(retour.length>0)
         {
          const update_retour = retour.map(() => {
            return {
              retour_status: 2,
              return_date: new Date(),
              updated_at: new Date(),
            };
          });
          console.log("filtred", retour)

          let compt = 0;
          await trx
            .table("retour_provider")
            .update(update_retour[compt++])
            .where(
              "id",
              "IN",
              retour.map((el) => el.id)
            );

          const history = retour.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "retour vers fournisseur terminé",
            };
          });

          await trx.table("colis_history").insert(history);
          

          const exist_InFacture = await trx
          .table("facture")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((el) => el)
          );

          let to_remove = _.unionBy(
            exist_InFacture,
            "colis"
          ).map(el=>el.colis)

          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });
        if(filtred.length > 0){
          const info_colis = await trx("colis").where(
            "id",
            "IN",
            filtred.map((el) => el)
          );
          const facture = info_colis.map((colis) => {
            const id = uuid.v1().toLocaleUpperCase();
  
            return {
              id: id,
              colis: colis.id,
              provider: colis.provider,
            };
          });
          await trx.table("facture").insert(facture);

        }
         }
          
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 200,
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
 * /return/to_agence/list:
 *   get:
 *     summary: Retrieve a list of return colis
 *     description: Retrieve a list of return colis .
 *     tags:
 *       - mobile_return_driver
 *     responses:
 *       200:
 *         description: A list of colis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/colis'
 *       500:
 *         description : Internal server
 */
app.get(
  "/return/to_agence/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
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

      const agence_user = req.userId;

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const retour = (
        await app.db.table("retour_agence ").where("driver", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));

      if (retour.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
          status: 200,
          data: retour,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: retour,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
/**
 * @swagger
 * /return/to_ongoing/agence:
 *   put:
 *     summary: update status retour to done (status=1).
 *     tags:
 *       - mobile_return_driver
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
 *               type: array
 *               example:  [ ]
 
 *     responses:
 *       201:
 *         description: return ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
app.put(
  "/return/to_ongoing/agence",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const retour = await trx
            .table("retour_agence")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const update_retour = retour.map(() => {
            return {
              retour_status: 1,
              return_date: new Date(),
              updated_at: new Date(),
            };
          });

          let compt = 0;
          await trx
            .table("retour_agence")
            .update(update_retour[compt++])
            .where(
              "id",
              "IN",
              retour.map((colis) => colis.id)
            );
          const history = retour.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "retour vers agence en cours",
            };
          });
          await trx.table("colis_history").insert(history);
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 200,
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
 * /retour/to_done/agence:
 *   put:
 *     summary: update status retour to done (status=2).
 *     tags:
 *       - mobile_return_driver
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
 *               type: array
 *               example:  [ ]
 
 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
app.put(
  "/retour/to_done/agence",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const retour = await trx
            .table("retour_agence")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const update_retour = retour.map(() => {
            return {
              retour_status: 2,
              return_date: new Date(),
              updated_at: new Date(),
            };
          });

          let compt = 0;
          await trx
            .table("retour_agence")
            .update(update_retour[compt++])
            .where(
              "id",
              "IN",
              retour.map((colis) => colis.id)
            );
          const history = retour.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "retour vers agence terminé",
            };
          });
          await trx.table("colis_history").insert(history);
          const info_colis = await trx
            .table("colis")
            .select("*")
            .where(
              "id",
              "IN",
              colis.map((e) => e)
            );
         
          const delivery = await trx("delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const delivery_update = info_colis.map((info) => {
            return {
              check_replanification: 0,
              agence_exchange: info.agence,
              status_delivery: 2,
            };
          });
          console.log(delivery_update);
          let compteur = 0;
          await trx
            .table("delivery")
            .update(delivery_update[compteur++])
            .where(
              "id",
              "IN",
              delivery.map((e) => e.id)
            );
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 200,
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
