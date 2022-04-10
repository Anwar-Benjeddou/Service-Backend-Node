const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /archive/console_from:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 2 (console done).
 *     description: list of console for each user.
 *     tags:
 *       - archive
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
 *         - in: query
 *           name: nb_days_last
 *           schema:
 *             type: integer
 *           description: The deafault nb of days is 3
 *     responses:
 *       200:
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/archive/console_from",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const nb_days_last = req.query.nb_days_last || 3;
      var from = new Date();
      from.setMilliseconds(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setDate(from.getDate() - nb_days_last);
      var to = new Date();
      to.setMilliseconds(0);
      to.setMinutes(0);
      to.setSeconds(0);
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis")).reduce(
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
        .andWhere("status_console", "=", 2)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.from_agence", "=", agence_user)
          .andWhere("status_console", "=", 2)
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
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
 * /archive/console_to:
 *   get:
 *     summary: Retrieve a list of exchange from my agence to other for each user when status is 2 (console done).
 *     description: list of console for each user.
 *     tags:
 *       - archive
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
 *         - in: query
 *           name: nb_days_last
 *           schema:
 *             type: integer
 *           description: The deafault nb of days is 3
 *     responses:
 *       200:
 *         decription: console fetched .
 *       400:
 *         description: console not found .
 *
 */
app.get(
  "/archive/console_to",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const nb_days_last = req.query.nb_days_last || 3;
      var from = new Date();
      from.setMilliseconds(0);
      from.setMinutes(0);
      from.setSeconds(0);
      from.setDate(from.getDate() - nb_days_last);
      var to = new Date();
      to.setMilliseconds(0);
      to.setMinutes(0);
      to.setSeconds(0);
      const agence_user = req.agence;

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis = (await app.db.table("colis")).reduce(
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
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .first();
      const exchange = (
        await app
          .db("console as c")
          .orderBy("c." + orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("c.to_agence", "=", agence_user)
          .andWhere("status_console", "=", 2)
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
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
