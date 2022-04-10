"use strict ";

const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");
const _ = require("lodash");

/**
 * @swagger
 * components:
 *   schemas:
 *     console:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The exchange ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f

 *         driver:
 *          type: string
 *          description: The agence's code generated in backend.
 *          example: 6DFGD
 
 *         from_agence:
 *          type: string
 *          description: FromAgence of delivery.
 *          example: lac
 *         to_agence:
 *          type: string
 *          description: ToAgence.
 *          example: lac
 *         code:
 *          type: string
 *          description: The console's code.
 *          example: lac
 *         status_console:
 *          type: string
 *          description: The status of console pending/ongoingdelivery (O-1-2).
 *          example: lac
 *         status_anomaly:
 *          type: string
 *          description: status anomaly if 1 console has anomaly esle 0.
 *          example: 0
 *         quantity:
 *          type: string
 *          description: The quantity of colis in console .
 *          example: lac
 *         check_magasinier_from:
 *          type: string
 *          description: status of check.
 *          example: lac
 *         magasinier_from:
 *          type: string
 *          description: The magasinier's id.
 *          example: lac
 *         date_check_magasinier_from:
 *          type: string
 *          description: The date Check of Magasinier.
 *          example: lac
 *         check_magasinier_to:
 *          type: string
 *          description: status of check.
 *          example: lac
 *         magasinier_to:
 *          type: string
 *          description: The magasinier's id.
 *          example: lac
 *         date_check_magasinier_to:
 *          type: string
 *          description: The date Check of Magasinier.
 *          example: lac
 *         date_console:
 *          type: string
 *          description: The date date_console.
 *          example: date_console
 *         status_console_Delivery:
 *          type: string
 *          description: The status console for delivery.
 *          example: date_console
 * 
 * 
 */

/**
 * @swagger
 * /console/add:
 *   post:
 *     summary: Create new console.
 *     tags:
 *       - console
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
 *              agence_to:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The exchange values.
 *                example: ["2D3E0680-DA5F-11EB-99E7-97715BE0A51A", "0E3B3951-DA60-11EB-99E7-97715BE0A51A","2D3E0680-DA5F-11EB-99E7-97715BE0A51A" ]                             
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
 *                     agence_to:          # <!--- form field name
 *                       type: string
 *                       required: true
 *                       example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *                     colis:          # <!--- form field name
 *                       type: string
 *                       required: true
 *                       description: The exchange values.
 *                       example: ["2D3E0680-DA5F-11EB-99E7-97715BE0A51A", "0E3B3951-DA60-11EB-99E7-97715BE0A51A","2D3E0680-DA5F-11EB-99E7-97715BE0A51A" ]                             
 
 
*/
app.post("/console/add", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const user = req.userId;
    const agence_user = req.agence;
    const { driver, agence_to, colis } = req.body;

    app.db
      .transaction(async (trx) => {
        const [num_console_setting] = await trx
          .table("setting")
          .select("num_console", "id");
        const code = "Console-" + parseInt(num_console_setting.num_console) + 1;
        if (num_console_setting) {
          await trx
            .table("setting")
            .update({
              num_console: parseInt(num_console_setting.num_console) + 1,
            })
            .where("id", "=", num_console_setting.id);
        }

        const data = colis.map((idcolis) => {
          const id = uuid.v1().toLocaleUpperCase(),
            console = {
              id: id,
              code: code,
              driver: driver,
              to_agence: agence_to,
              from_agence: agence_user,
              colis: idcolis,
            },
            colis_history = {
              id: uuid.v1().toLocaleUpperCase(),
              action: id,
              colis: idcolis,
              actionneurs: user,
              agence: req.agence,
              event: "créer transfert",
              vu_provider: 1
            };
          return { console, colis_history };
        });

        await trx("console").insert(
          data.map((d) => {
            return d.console;
          })
        );

        await trx("colis_history").insert(
          data.map((d) => {
            return d.colis_history;
          })
        );

        const coliss = colis.map(() => {
          return {
            status_delivery_exchange: 1,
            updated_at: new Date(),
            agence_transfert: agence_to
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
      })
      .then(() => {
        res.status(201).json({
          message: "Successfully created colis",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});

/**
 * @swagger
 * /console/pending_from/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 0 (console pending).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/pending_from/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("from_agence", "=", agence_user)
        .andWhere("status_console", "=", 0)
        .andWhere("check_magasinier_from", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)

          .where("c.from_agence", "=", agence_user)
          .andWhere("check_magasinier_from", "=", 1)
          .andWhere("status_console", "=", 0)
         .andWhere("status_console_Delivery ","=", 0)

      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console pending for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/ongoing_from/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 1 (console ongoing).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/ongoing_from/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("from_agence", "=", agence_user)
        .andWhere("status_console", "=", 1)
        .andWhere("check_magasinier_from", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)

        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.from_agence", "=", agence_user)
          .andWhere("status_console", "=", 1)
          .andWhere("check_magasinier_from", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)

      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console ongoing for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/done_from/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 2 (console done).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/done_from/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const id_colis = await app.db.table("colis").select("id").where("etat_final", "=", 0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
     
      const total = await app
        .db("console")
        .count("* as count")
        .where("from_agence", "=", agence_user)
        .andWhere("status_console", "=", 2)
        .andWhere("check_magasinier_from", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)

        .andWhere("colis", "IN", id_colis.map(el=>el.id))
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.from_agence", "=", agence_user)
          .andWhere("status_console", "=", 2)                 
          .andWhere("check_magasinier_from", "=", 1)
         .andWhere("status_console_Delivery ","=", 0)

          .andWhere("colis", "IN", id_colis.map(el=>el.id))

      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console pending for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/pending_to/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 0 (console pending).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/pending_to/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("to_agence", "=", agence_user)
        .andWhere("status_console", "=", 0)
        .andWhere("check_magasinier_to", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.to_agence", "=", agence_user)
          .andWhere("status_console", "=", 0)
        .andWhere("status_console_Delivery ","=", 0)

      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console pending for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/ongoing_to/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 1 (console ongoing).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/ongoing_to/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("to_agence", "=", agence_user)
        .andWhere("status_console", "=", 1)
        .andWhere("check_magasinier_to", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)

        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.to_agence", "=", agence_user)
          .andWhere("status_console", "=", 1)
          .andWhere("check_magasinier_to", "=", 1)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console ongoing for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/done_to/list:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 2 (console done).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/console/done_to/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const id_colis = await app.db.table("colis").select("id").where("etat_final", "=", 0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("to_agence", "=", agence_user)
        .andWhere("status_console", "=", 2)
        .andWhere("check_magasinier_to", "=", 1)
        .andWhere("status_console_Delivery ","=", 0)
        .andWhere("colis", "IN", id_colis.map(el=>el.id))
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.to_agence", "=", agence_user)
          .andWhere("status_console", "=", 2)
          .andWhere("check_magasinier_to", "=", 1)
          .andWhere("status_console_Delivery ","=", 0)

          .andWhere("colis","IN",id_colis.map(el=>el.id))
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console pending for exchange not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/for_delivery:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 2 (console done).
 *     description: list of console for each user.
 *     tags:
 *       - console
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
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */

app.get(
  "/console/for_delivery",
  [authJwt.verifyToken],
  async (req, res, next) => {
    console.log(req.agence);
    try {
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app
        .db("console")
        .count("* as count")
        .where("to_agence", "=", agence_user)
        .andWhere("status_console", "=", 2)
        .andWhere("status_console_Delivery", "=", 0)
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset) 
          .limit(per_page)
          .where("c.to_agence", "=", agence_user)
          .andWhere("status_console", "=", 2)
          .andWhere("status_console_Delivery", "=", 0)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));
      var count = total.count;
      var rows = exchange;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (exchange.length === 0) {
        return res.json({
          message: "console done for delivery not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/delivery/add:
 *   post:
 *     summary: Create new delivery after exchange.
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
app.post(
  "/console/delivery/add",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const user = req.userId;
      const { driver, colis } = req.body;

      app.db
        .transaction(async (trx) => {

          let colis_InAgence = await trx('colis').select("id").where(
            "id",
            "IN",
            colis.map((colisid) => colisid)
          )
            .andWhere("agence", "!=", agence_user)
            .orWhere("agence_transfert", "!=", agence_user)
            .andWhere(
              "id",
              "IN",
              colis.map((colisid) => colisid)
            )

          let pickup_done = await trx("pickup")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            .andWhere("status_pickup", "!=", 2)
            .orWhere("check_magasinier", "=", 0)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );

          let exist_InConsole = await trx("console")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid))
            .andWhere("status_console", "!=", 2)
            .orWhere("check_magasinier_to", "=", 1)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            .orWhere("status_console_Delivery", "!=", 0)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )


          let exist_InDelivery = await trx("delivery")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );
          let to_remove = _.unionBy(
            pickup_done,
            exist_InConsole,
            exist_InDelivery,
            colis_InAgence,
            "colis"
          ).map(el => el.colis)


          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });
          const dispatchExist = {
            done_InPickup: pickup_done.map(el => el.colis),
            exist_InConsole: exist_InConsole.map(el => el.colis),
            exist_InDelivery: exist_InDelivery.map(el => el.colis),
            colis_InAgence: colis_InAgence.map(el => el.colis)
          }

          if (filtred.length > 0) {
            const coliss = filtred.map(() => {
              return {
                status_console_Delivery: 1,
                updated_at: new Date(),

              };
            });
            const idconsoles = await app.db("console").where(
              "colis",
              "IN",
              filtred.map((colis) => colis)
            );
            let i = 0;
            await trx("console")
              .update(coliss[i++])
              .where(
                "id",
                "IN",
                idconsoles.map((console) => console.id)
              );

            const data = filtred.map((idcolis) => {
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
                  vu_provider: 1
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
            res.status(201).json({
              message: "Successfully created delivery",
              status: 200,
              data: dispatchExist,
            });
          }
          else {
            res.status(404).json({
              message:
                "colis  dispatch ou pickup non terminé / colis n'appartient pas votre agence ",
              status: 440,
              data: dispatchExist,
            });
          }








        })

       
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/console/{id}:
 *   get:
 *     summary: Retrieve a list of pickup for each user used in affectation driver for delivery or exchange (affectation).
 *     description: list of pickup for each user.
 *     tags:
 *       - console
 *     parameters:
 *       - in: query
 *         name: status_console
 *         schema:
 *           type: integer
 *           description: status console 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID driver.
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
  "/admin/manifest/console/:id",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      const driverId = req.params.id;
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
      const colis = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      if (driverId) {
        let console
        if (req.query.status_console == 1 || req.query.status_console == 0) {
          console = (
            await app.db
              .table("console")
              .select("*")
              .andWhere("status_console", "=", req.query.status_console)
              .where("driver", "=", driverId)
          ).map((e) => ({
            ...e,
            to_agence: agence[e.to_agence],
            colis: colis[e.colis],
          }));
        }
        else {
          console = (
            await app.db
              .table("console")
              .select("*")
              .where("driver", "=", driverId)
              .andWhere("status_console", "=", 0)
              .orWhere("status_console", "=", 1)

          ).map((e) => ({
            ...e,
            to_agence: agence[e.to_agence],
            colis: colis[e.colis],
          }));
        }
        if (console.length === 0) {
          return res.json({
            message: "console   not found  ",
            status: 200,
            data: console,
          });
        }
        res.json({
          message: "console  fetched",
          status: 200,
          data: console,
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
    }
  }
);

/**
 * @swagger
 * /console/to_console/add:
 *   post:
 *     summary: console to console  in colis.
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
app.post(
  "/console/to_console/add",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const user = req.userId;
      const { driver, colis, agence_to } = req.body;

      app.db
        .transaction(async (trx) => {
          let colis_InAgence = await trx('colis').select("colis").where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
            .andWhere("agence", "!=", agence_user)
            .orWhere("agence_transfert", "!=", agence_user)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )

          let pickup_done = await trx("pickup")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            .andWhere("status_pickup", "!=", 2)
            .orWhere("check_magasinier", "=", 0)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );

          let exist_InConsole = await trx("console")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)

            )
            .andWhere("status_console", "!=", 2)

          let exist_InDelivery = await trx("delivery")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );
          let to_remove = _.unionBy(
            pickup_done,
            exist_InConsole,
            exist_InDelivery,
            colis_InAgence,
            "colis"
          ).map(el => el.colis)


          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });
          const dispatchExist = {
            done_InPickup: pickup_done.map(el => el.colis),
            exist_InConsole: exist_InConsole.map(el => el.colis),
            exist_InDelivery: exist_InDelivery.map(el => el.colis),
            colis_InAgence: colis_InAgence.map(el => el.colis)
          }

          if (filtred.length > 0) {
            const transfert = filtred.map(() => {
              return {
                status_console_Delivery: 1,
                updated_at: new Date(),
              };
            });

            const coliss = filtred.map(() => {
              return {
                status_delivery_exchange: 1,
                updated_at: new Date(),
                agence_transfert: agence_to
              };
            });

            let j = 0;
            await trx("colis")
              .update(coliss[j++])
              .where(
                "id",
                "IN",
                filtred.map((colis) => colis)
              );
            const idconsoles = await app.db("console").where(
              "colis",
              "IN",
              filtred.map((colis) => colis)
            );
            let i = 0;
            await trx("console")
              .update(transfert[i++])
              .where(
                "id",
                "IN",
                idconsoles.map((console) => console.id)
              );


            const code = "Console-" + Math.floor(1000 + Math.random() * 9000);

            const data = filtred.map((idcolis) => {
              const id = uuid.v1().toLocaleUpperCase(),
                console = {
                  id: id,
                  code: code,
                  driver: driver,
                  to_agence: agence_to,
                  from_agence: agence_user,
                  colis: idcolis,
                },
                colis_history = {
                  id: uuid.v1().toLocaleUpperCase(),
                  action: id,
                  colis: idcolis,
                  actionneurs: user,
                  agence: req.agence,
                  event: "colis avec multiple transfert",
                };
              return { console, colis_history };
            });

            await trx("console").insert(
              data.map((d) => {
                return d.console;
              })
            );

            await trx("colis_history").insert(
              data.map((d) => {
                return d.colis_history;
              })
            );
            res.status(201).json({
              message: "Successfully created console",
              status: 200,
              data: dispatchExist,
            });
          }
          else {
            res.status(404).json({
              message: "colis  dispatch ou pickup non terminé / colis n'appartient pas votre agence",
              status: 404,
              data: dispatchExist,
            });
          }



        })



        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /console/update/driver:
 *   put:
 *     summary: update driver for console.
 *     tags:
 *       - console
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
 *              agence:          # <!--- form field name
 *                type: string
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
 *                     agence:
 *                       type: string
 *                       description: The agence transfert's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The customer's id.
 *                       example: []
 *
 */
app.put(
  "/console/update/driver",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const { driver, agence, colis } = req.body;

      app.db
        .transaction(async (trx) => {
          const idconsoles = await app.db("console").where(
            "colis",
            "IN",
            colis.map((colis) => colis)
          );
          let coliss, colis_history
          if (driver && agence) {
            coliss = colis.map(() => {
              return {
                driver: driver,
                to_agence: agence,
                updated_at: new Date(),
              };
            });
            colis_history = idconsoles.map((idcolis) => {
              return {
                id: uuid.v1().toLocaleUpperCase(),
                action: idcolis.id,
                colis: idcolis.colis,
                actionneurs: user,
                agence: req.agence,
                event: "le chauffeur et l'agence de console  modifiés",
                vu_provider: 1
              };
            });
          }
          else if (driver) {
            coliss = colis.map(() => {
              return {
                driver: driver,
                updated_at: new Date(),
              };
            });
            colis_history = idconsoles.map((idcolis) => {
              return {
                id: uuid.v1().toLocaleUpperCase(),
                action: idcolis.id,
                colis: idcolis.colis,
                actionneurs: user,
                event: "le chauffeur de console était modifié",
              };
            });
          }
          else if (agence) {
            coliss = colis.map(() => {
              return {
                to_agence: agence,
                updated_at: new Date(),
              };
            });
            colis_history = idconsoles.map((idcolis) => {
              return {
                id: uuid.v1().toLocaleUpperCase(),
                action: idcolis.id,
                colis: idcolis.colis,
                actionneurs: user,
                agence: req.agence,
                event: "l'agence de console était modifié",
                vu_provider: 1
              };
            });
          }



          let i = 0;
          await trx("console")
            .update(coliss[i++])
            .where(
              "id",
              "IN",
              idconsoles.map((console) => console.id)
            );




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
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
