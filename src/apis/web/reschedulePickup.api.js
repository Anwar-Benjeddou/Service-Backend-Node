const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * /pickup/reschedule/list:
 *   get:
 *     summary: Retrieve a list of  reschedule pickup for driver assign.
 *     description:  Retrieve a list of  reschedule pickup.
 *     tags:
 *       - reschedule_pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/pickup/reschedule/list",
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
      const coliss = (await app.db.table("colis").where("etat_final","=",0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const providers = await app.db
        .from("provider " + " as p")
        .select("p.id")
        .join("app_user as u ", "u.id", "p.id")
        .where("agence", "=", agence_user);
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        )
        .andWhere("etat_final","=",0)
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .where("status_anomaly", "=", 1)
        .andWhere("status_pickup", "=", 2)
        .where("check_replanification", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_anomaly", "=", 1)
          .andWhere("status_pickup", "=", 2)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        driver: driver[e.driver],
        colis: coliss[e.colis],
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
          message: "pickups for reschedule  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "packeges fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /pickup/to_reschedule:
 *   put:
 *     summary: reschedule pickup 
 *     tags:
 *       -  reschedule_pickup  
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
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
 *              coliss:
 *                  type: array
 *                  example:  [ "1323A010-D8EE-11EB-AF2C-7755068897C0", "13224080-D8EE-11EB-AF2C-7755068897C0"]
 *               
 
 *     responses:
 *       201:
 *         description: reschedulepickup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     coliss:
 *                       type: array
 *                       description: The pickup's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/pickup/to_reschedule",
  [authJwt.verifyToken],
  async (req, res, next) => {
    const user = req.userId;

    try {
      app.db
        .transaction(async (trx) => {
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              req.body.coliss.map((e) => e)
            );
          for (const pack of pickups) {
            await trx
              .table("pickup")
              .update({
                check_replanification: 1,
                driver: req.body.driver,
                status_pickup: 0,
                status_anomaly: 0,
                date_replanification: new Date(),
              })
              .where("id", "=", pack.id);
            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: user,
              agence:req.agence,
              event: "reschedule pickup",
            });
          }
        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated pickup",
            status: 200,
            data: req.body,
          });
        })
        .catch(function (err) {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /anomaly/pickup/plan:
 *   get:
 *     summary: Retrieve a list of  anomaly pickup  reschedule.
 *     description:  Retrieve a list of  anomaly pickup  reschedule.
 *     tags:
 *       - reschedule_pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/anomaly/pickup/plan",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const coliss = (await app.db.table("colis").select("id", "provider"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const pickups = (await app.db.table("pickup"))
        .map((e) => ({ ...e, colis: coliss[e.colis] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "PICKUP");

      const anoamly = (await app.db("anomaly_message"))
        .map((e) => ({
          ...e,
          category: category,
        }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idproviders = await app.db
        .from("provider as p")
        .join("app_user as u ", "u.id", "p.id")
        .select("p.id")
        .where("agence", "=", agence_user);

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          idproviders.map((e) => e.id)
        );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idpickups = await app.db
        .table("pickup")
        .select("id")
        .where("check_replanification", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      const total = await app.db
        .table("anomaly_pickup")
        .count("* as count")
        .andWhere(
          "pickup",
          "IN",
          idpickups.map((e) => e.id)
        )
        .first();
      const ListanomalyPickup = (
        await app.db
          .table("anomaly_pickup")
          .where(
            "pickup",
            "IN",
            idpickups.map((e) => e.id)
          )
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
      ).map((e) => ({
        ...e,
        pickup: pickups[e.pickup],
        driver: driver[e.driver],
        anomaly: anoamly[e.anomaly],
      }));
      var count = total.count;
      var rows = ListanomalyPickup;
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
          message: "anomaly   not found  ",
          status: 200,
          data: pagination,
        });
      }

      res.json({
        message: "anomaly fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /anomaly/pickup/not_plan:
 *   get:
 *     summary: Retrieve a list of  anomaly pickup  reschedule.
 *     description:  Retrieve a list of  anomaly pickup  reschedule.
 *     tags:
 *       - reschedule_pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/anomaly/pickup/not_plan",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const coliss = (await app.db.table("colis").select("id", "provider"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const pickups = (await app.db.table("pickup"))
        .map((e) => ({ ...e, colis: coliss[e.colis] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "PICKUP");

      const anoamly = (await app.db("anomaly_message"))
        .map((e) => ({
          ...e,
          category: category,
        }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idproviders = await app.db
        .from("provider as p")
        .join("app_user as u ", "u.id", "p.id")
        .select("p.id")
        .where("agence", "=", agence_user);

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          idproviders.map((e) => e.id)
        );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idpickups = await app.db
        .table("pickup")
        .select("id")
        .where("check_replanification", "=", 0)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("status_pickup", "=", 2)

        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      const total = await app.db
        .table("anomaly_pickup")
        .count("* as count")
        .andWhere(
          "pickup",
          "IN",
          idpickups.map((e) => e.id)
        )
        .first();
      const ListanomalyPickup = (
        await app.db
          .table("anomaly_pickup")
          .where(
            "pickup",
            "IN",
            idpickups.map((e) => e.id)
          )
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
      ).map((e) => ({
        ...e,
        pickup: pickups[e.pickup],
        driver: driver[e.driver],
        anomaly: anoamly[e.anomaly],
      }));
      var count = total.count;
      var rows = ListanomalyPickup;
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
          message: "anomaly   not found  ",
          status: 200,
          data: pagination,
        });
      }

      res.json({
        message: "anomaly fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);
