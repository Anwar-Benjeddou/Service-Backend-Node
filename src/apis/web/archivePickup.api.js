const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /archive/admin/pickup:
 *   get:
 *     summary: Retrieve a list of archive pickup for last x days (espace admin).
 *     description: list of pickup for each user for last x days.
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
 *           name: nb_days_last
 *           schema:
 *             type: integer
 *           description: The deafault nb of days is 3
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/archive/admin/pickup",
  [authJwt.verifyToken],
  async (req, res, next) => {
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
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("agence", "=", agence_user);
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup_bk")
        .count("* as count")
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .first();
      const pickups = (
        await app.db
          .table("pickup_bk")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 2)
          .andWhere("status_anomaly", "=", 0)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
        driver: driver[e.driver],
      }));
      var count = total.count;
      var rows = pickups;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickups.length === 0) {
        return res.json({
          message: "pickup done  not found  ",
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
 * /archive/provider/pickup:
 *   get:
 *     summary: Retrieve a list archive pikups espace (provider).
 *     description: list of pickup for each provider.
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/archive/provider/pickup",
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
      const user = req.userId;
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);
      const coliss = (await app.db.table("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const total = await app.db
        .table("pickup_bk")
        .count("* as count")
        .andWhere("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere("updated_at", ">=", from)
        .andWhere("updated_at", "<", to)
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )

        .first();
      let pickupPending = (
        await app.db
          .table("pickup_bk")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 2)
          .andWhere("status_anomaly", "=", 0)
          .andWhere("updated_at", ">=", from)
          .andWhere("updated_at", "<", to)
          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));

      var count = total.count;
      var rows = pickupPending;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickupPending.length === 0) {
        return res.json({
          message: "colis pending for pickup not found  ",
          status: 200,
          data: rows,
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
