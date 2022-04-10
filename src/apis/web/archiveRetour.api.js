const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /archive/provider/retour_provider:
 *   get:
 *     summary: Retrieve a archive list of retour for each provider .
 *     description: list of colis for each provider.
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/archive/provider/retour_provider",
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
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("provider", "=", user)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .andWhere("retour_status", "=", 2)

        .first();
      const retour = (
        await app.db
          .table("retour_provider ")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("provider", "=", user)
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
          .andWhere("retour_status", "=", 2)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = retour;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;

      if (retour.length === 0) {
        return res.json({
          message: "colis  retour  not found  ",
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
 * /archive/admin/retour_provider:
 *   get:
 *     summary: Retrieve a archive list of retour for each admin .
 *     description: list of colis for each admin.
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/archive/admin/retour_provider",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("agence_provider", "=", agence_user)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .andWhere("retour_status", "=", 2)

        .first();
      const retour = (
        await app.db
          .table("retour_provider ")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("agence_provider", "=", agence_user)
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
          .andWhere("retour_status", "=", 2)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = retour;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;

      if (retour.length === 0) {
        return res.json({
          message: "colis  retour  not found  ",
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
