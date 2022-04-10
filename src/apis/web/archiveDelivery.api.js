const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
/**
 * @swagger
 * /archive/admin/delivery:
 *   get:
 *     summary: Retrieve a archive list of colis for each user  espave admin.
 *     description: list of colis for each user.
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
  "/archive/admin/delivery",
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
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .andWhere("agence_exchange", "=", agence_user)
        .andWhere("status_anomaly", "=", 0)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
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
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
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
 * /archive/provider/delivery:
 *   get:
 *     summary: Retrieve archive list of colis for each provider .
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
  "/archive/provider/delivery",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (await app.db.table("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);
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
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .where("status_anomaly", "=", 0)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)

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
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)

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
