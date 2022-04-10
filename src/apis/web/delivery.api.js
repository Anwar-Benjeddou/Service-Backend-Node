const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /delivery/delete/{id}:
 *   delete:
 *     summary: Delete delivery.
 *     description: delete delivery.
 *     tags:
 *       - facture
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of delivery to delete .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: delivery deleted
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.delete(
  "/delivery/delete/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      if (req.params.id) {
        await app.db("delivery").delete().where("id", "=", req.params.id);
        res.json({
          message: "delivery deleted",
          status: 200,
          data: " ",
        });
      } else {
        res.json({
          message: "id not exist",
          status: 200,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * components:
 *   schemas:
 *     delivery:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The exchange ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         driver:
 *          type: string
 *          description: The driver's id.
 *          example: 6DFGD
 *         colis:
 *          type: string
 *          description: The colis's id.
 *          example: 71******
 *         date_livraision:
 *          type: string
 *          description: date of delivery.
 *          example: lac
 *         code:
 *          type: string
 *          description: The colis's code.
 *          example: lac
 *         status_delivery:
 *          type: string
 *          description: The status_delivery of colis pending/ongoingdelivery (O-1-2).
 *          example: lac
 *         status_anomaly:
 *          type: string
 *          description: status anomaly if 1 colis has anomaly esle 0.
 *          example: 0
 *         agence_exchange:
 *          type: string
 *          description: The agence exchange .
 *          example: lac
 *         check_magasinier:
 *          type: string
 *          description: status of check.
 *          example: lac
 *         magasinier:
 *          type: string
 *          description: The magasinier's id.
 *          example: lac
 *         date_check_magasinier:
 *          type: string
 *          description: The date Check of Magasinier.
 *          example: lac
 */

/**
 * @swagger
 * /delivery/add:
 *   post:
 *     summary: Create new delivery.
 *     tags:
 *       - delivery
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The colis values.
 *                example: [ ]
 *
 *
 *         text/plain:
 *           schema:
 *            type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The customer's id.
 *                       example: []
 *
 */
app.post("/delivery/add", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence_user = req.agence;
    const user = req.userId;
    const { driver, colis } = req.body;

    app.db
      .transaction(async (trx) => {
        const coliss = colis.map(() => {
          return {
            status_delivery_exchange: 1,
            updated_at: new Date(),
          };
        });

        let i = 0;
        await trx("colis")
          .update(coliss[i++])
          .where(
            "id",
            "IN",
            colis.map((colis) => colis)
          );
        const data = colis.map((idcolis) => {
          const id = uuid.v1().toLocaleUpperCase(),
            delivery = {
              driver: driver,
              colis: idcolis,
              id: id,
              code: "COLIS-" + Math.floor(1000 + Math.random() * 9000),
              agence_exchange: agence_user,
            },
            colis_history = {
              id: uuid.v1().toLocaleUpperCase(),
              action: id,
              colis: idcolis,
              actionneurs: user,
              agence: req.agence,
              event: "créer livraison ",
            };
          return { delivery, colis_history };
        });
        await trx("delivery").insert(
          data.map((d) => {
            return d.delivery;
          })
        );

        await trx("colis_history").insert(
          data.map((d) => {
            return d.colis_history;
          })
        );
      })

      .then(() => {
        res.status(201).json({
          message: "Successfully created colis",
          status: 200,
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
 * /admin/delivery/pending/list:
 *   get:
 *     summary: Retrieve a list of colis for each user when status is 0 (delivery pending).
 *     description: list of colis for each user.
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
  "/admin/delivery/pending/list",
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

      const agence_user = req.agence;

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 0)
        .andWhere("agence_exchange", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 0)
          .andWhere("agence_exchange", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis pending  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/delivery/ongoing/list:
 *   get:
 *     summary: Retrieve a list of colis for each user when status is 1 (delivery ongoing).
 *     description: list of colis for each user.
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
  "/admin/delivery/ongoing/list",
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

      const agence_user = req.agence;

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 1)
        .andWhere("agence_exchange", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 1)
          .andWhere("agence_exchange", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis ongoing  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/delivery/done/list:
 *   get:
 *     summary: Retrieve a list of colis for each user when status is 2 (livraision terminé).
 *     description: list of colis for each user.
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
  "/admin/delivery/done/list",
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

      const agence_user = req.agence;

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const id_colis = await app.db.table("colis").select("id").where("etat_final", "=", 0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .andWhere("agence_exchange", "=", agence_user)
        .andWhere("status_anomaly", "=", 0)
        //.andWhere("check_magasinier", "=", 0)
        .andWhere("etat_payment", "=", 0)
        .andWhere("colis", "IN", id_colis.map(el => el.id))

        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 2)
          .andWhere("agence_exchange", "=", agence_user)
          .andWhere("status_anomaly", "=", 0)
          .andWhere("etat_payment", "=", 0)



          //.andWhere("check_magasinier", "=", 0)
          .andWhere("colis", "IN", id_colis.map(el => el.id))
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis done  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/delivery/pending/all/list:
 *   get:
 *     summary: Retrieve a list of colis for each provider when status is 0,1,2 (delivery all).
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
  "/provider/delivery/pending/all/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const colis = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_anomaly", "=", 0)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = colis;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (colis.length === 0) {
        return res.json({
          message: "colis pending  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);


/**
 * @swagger
 * /provider/delivery/pending/list:
 *   get:
 *     summary: Retrieve a list of colis for each provider when status is 0 (delivery pending).
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
  "/provider/delivery/pending/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const colis = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 0)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = colis;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (colis.length === 0) {
        return res.json({
          message: "colis pending  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/delivery/ongoing/list:
 *   get:
 *     summary: Retrieve a list of colis for each provider when status is 1 (delivery ongoing).
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
  "/provider/delivery/ongoing/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0)

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const colis = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 1)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = colis;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (colis.length === 0) {
        return res.json({
          message: "colis ongoing  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
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
  "/provider/delivery/done/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0)

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .where("status_anomaly", "=", 0)

        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const colis = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 2)
          .where("status_anomaly", "=", 0)

          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = colis;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (colis.length === 0) {
        return res.json({
          message: "colis delivered  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/delivery/{id}:
 *   get:
 *     summary: Retrieve a list of colis for each driver when status is 0 (delivery pending).
 *     description: list of colis for each driver.
 *     tags:
 *       - delivery
 *     parameters:
 *       - in: query
 *         name: status_delivery
 *         schema:
 *           type: integer
 *           description: status console 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */
app.get(
  "/admin/manifest/delivery/:id",
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
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const id_driver = req.params.id;
      const status = req.query.status_delivery === "Tout" ? 0:req.query.status_delivery  ;
      const status1 = req.query.status_delivery  === "Tout" ? 1:req.query.status_delivery  ;
      console.log(status);
      let delivery = [];
      if (id_driver) {
        if (status == 1 || status == 0) {
          delivery = (
            await app.db
              .table("delivery")
              .where("driver", "=", id_driver)
              .andWhere("status_delivery", "=", status1)
              .orWhere("status_delivery", "=", status)
              .where("driver", "=", id_driver)
          ).map((e) => ({
            ...e,
            colis: coliss[e.colis],
          }));
        } else {
          delivery = (
            await app.db
              .table("delivery")
              .where("driver", "=", id_driver)
              .andWhere("status_delivery", "=", status1)
              .orWhere("status_delivery", "=", status)
              .where("driver", "=", id_driver)
          ).map((e) => ({
            ...e,
            colis: coliss[e.colis],
          }));
        }

        if (delivery.length === 0) {
          return res.json({
            message: "colis   not found  ",
            status: 200,
            data: delivery,
          });
        }
        res.json({
          message: "colis fetched",
          status: 200,
          data: delivery,
        });
      } else {
        res.json({
          message: "entry driver",
          status: 200,
          data: [],
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
 * /delivery/update/driver:
 *   put:
 *     summary: edit delivery driver.
 *     tags:
 *       - delivery
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The colis values.
 *                example: [ ]
 *
 *
 *         text/plain:
 *           schema:
 *            type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The customer's id.
 *                       example: []
 *
 */
app.put(
  "/delivery/update/driver",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const { driver, colis } = req.body;

      app.db
        .transaction(async (trx) => {
          const id_delivery = await trx
            .table("delivery")
            .select("id", "colis")
            .where(
              "colis",
              "IN",
              colis.map((colis) => colis)
            )




          const delivery = colis.map(() => {
            return {
              driver: driver,
              updated_at: new Date(),
            };
          });

          const colis_history = id_delivery.map((idcolis) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: idcolis.id,
              colis: idcolis.colis,
              actionneurs: user,
              agence: req.agence,
              event: "le chauffeur de livraison est modifié",
            };
          });

          let i = 0;
          await trx("delivery")
            .update(delivery[i++])
            .where(
              "id",
              "IN",
              id_delivery.map((eldelivery) => eldelivery.id)
            ).andWhere("status_delivery", "!=", 2)

          await trx("colis_history").insert(colis_history);
        })

        .then(() => {
          res.status(201).json({
            message: "Successfully created colis",
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
 * /delivery/update/agence:
 *   put:
 *     summary: edit delivery agence.
 *     tags:
 *       - delivery
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              agenve:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The colis values.
 *                example: [ ]
 *
 *
 *         text/plain:
 *           schema:
 *            type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The customer's id.
 *                       example: []
 *
 */
app.put(
  "/delivery/update/agence",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const { agence, colis } = req.body;

      app.db
        .transaction(async (trx) => {
          const id_delivery = await trx
            .table("delivery")
            .select("id", "colis")
            .where(
              "colis",
              "IN",
              colis.map((colis) => colis)
            );

          const delivery = colis.map(() => {
            return {
              agence_exchange: agence,
              updated_at: new Date(),
            };
          });

          const colis_history = id_delivery.map((idcolis) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: idcolis.id,
              colis: idcolis.colis,
              actionneurs: user,
              agence: req.agence,
              event: "l'agence de livraison est modifié",
            };
          });

          let i = 0;
          await trx("delivery")
            .update(delivery[i++])
            .where(
              "id",
              "IN",
              id_delivery.map((eldelivery) => eldelivery.id)
            ).andWhere("status_delivery", "!=", 2)

          await trx("colis_history").insert(colis_history);
        })

        .then(() => {
          res.status(201).json({
            message: "Successfully created colis",
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
 * /provider/delivery/retour/nonDispatch:
 *   get:
 *     summary: Retrieve a list of return colis not dispatch for each provider.
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
  "/provider/delivery/retour/nonDispatch",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0)
      const [num_tentative_setting] = await app
        .db("setting")
        .select("*")
        .pluck("nb_tentative");
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("tentatif", "=", num_tentative_setting)
        .andWhere("check_replanification", "=", 0)

        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const colis = (
        await app.db
          .table("delivery")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_delivery", "=", 2)
          .andWhere("status_anomaly", "=", 1)
          .andWhere("tentatif", "=", num_tentative_setting)
          .andWhere("check_replanification", "=", 0)

          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = colis;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (colis.length === 0) {
        return res.json({
          message: "colis delivered  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);