const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
let _ = require("lodash");
const uuid = require("uuid");

/**
 * @swagger
 * /anomaly/delivery/colis/{id}:
 *   get:
 *     summary: anomaly delivery list by colis
 *     description: anomaly delivery list by colis
 *     tags:
 *       - anomaly
 
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: String ID of the colis to retrieve.
 *           schema:
 *           type: string
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
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
app.get(
  "/anomaly/delivery/colis/:id",
  /*  [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      const delivery = (
        await app.db
          .table("delivery")
          .select("colis", "tentatif", "date_replanification")
          .andWhere("colis", "=", req.params.id)
      ).reduce((a, e) => ({ ...a, [e.colis]: e }), {});
      const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        //.where("name", "=", "DELIVERY");

      const anomaly = (
        await app.db("anomaly_message")
      )
        .map((e) => ({ ...e, category: category }))
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
        .table("anomaly_delivery")
        .count("* as count")
        .andWhere("colis", "=", req.params.id)
        .first();
      const anomalies = (
        await app.db
          .table("anomaly_delivery")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("colis", "=", req.params.id)
      ).map((e) => ({
        ...e,
        anomaly: anomaly[e.anomaly],
        tentative: _.omit(delivery[e.colis], "colis"),
      }));

      var count = total.count;
      var rows = anomalies;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (anomalies.length === 0) {
        return res.json({
          message: "pickups   not found  ",
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
 * /admin/anomaly/delivery:
 *   get:
 *     summary: all anomaly delivery list grouped by colis
 *     description: anomaly delivery list grouped by colis interface admin
 *     tags:
 *       - anomaly
 
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
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
app.get(
  "/admin/anomaly/delivery",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const colis = await app.db.table("colis").select("*")
      //.pluck("id")
       .where("agence", "=", agence_user);
        const delivery = (
        await app.db
          .table("delivery")
          .select("colis", "tentatif", "date_replanification")
          .andWhere(
            "colis",
            "IN",
            colis.map((elcolis) => elcolis.id)
          )
      ).reduce((a, e) => ({ ...a, [e.colis]: e }), {}); 
      console.log(agence_user)
        /* const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "DELIVERY");

      const anomaly = (
        await app.db("anomaly_message").where("category", "=", category.id)
      )
        .map((e) => ({ ...e, category: category }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {}); */
 
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
       const total = await app.db
        .table("anomaly_delivery")
        .count("* as count")
        .andWhere(
          "colis",
          "IN",
          colis.map((elcolis) => elcolis.id)
        )
        .first();
        const colis_info = (await app.db
          .table("colis")
          .select("*"))
          .reduce((a, e) => ({ ...a, [e.id]: e }), {});

          
      const anomalies = (await app.db
        .table("anomaly_delivery")
        .select("*")
        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
        .where("agence", "=", agence_user) ).map((e) => ({
        ...e,
       ///anomaly: anomaly[e.anomaly],
       colis: colis_info[e.colis],
        tentative: _.omit(delivery[e.colis], "colis"),
      }));
      console.log(anomalies)
      /*   var grouped = _.mapValues(_.groupBy(anomalies, "colis"), (clist) =>
        clist.map((car) => _.omit(car, "colis"))
      );
      let result = [];
      _.mapKeys(grouped, (value, key) => {
        colis.forEach((c1) => {
          console.log(c1);
          if (c1.id === key) {
            result.push({ colis: c1, anomalies: value });
          }
        });
      }); */
       var count = total.count;
     // var count = anomalies.length;

      var rows = anomalies;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (anomalies.length === 0) {
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
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/anomaly/delivery:
 *   get:
 *     summary: all anomaly delivery list grouped by colis 
 *     description: anomaly delivery list grouped by colis interface provider
 *     tags:
 *       - anomaly
 
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
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
app.get(
  "/provider/anomaly/delivery",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const colis_info = (await app.db
        .table("colis")
        .select("*"))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const colis_id = await app.db
        .table("colis")
        .select("*")
        .where("provider", "=", user);
      const delivery = (
        await app.db
          .table("delivery")
          .select("colis", "tentatif", "date_replanification")
          .andWhere(
            "colis",
            "IN",
            colis_id.map((elcolis) => elcolis.id)
          )
      ).reduce((a, e) => ({ ...a, [e.colis]: e }), {});
      /*   const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "DELIVERY"); */

      /*  const anomaly = (
        await app.db("anomaly_message").where("category", "=", category.id)
      )
        .map((e) => ({ ...e, category: category }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {}); */

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const anomalies = (
        await app.db
          .table("anomaly_delivery")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere(
            "colis",
            "IN",
            colis_id.map((elcolis) => elcolis.id)
          )
      ).map((e) => ({
        ...e,
        // anomaly: anomaly[e.anomaly],
        colis: colis_info[e.colis],
        tentative: _.omit(delivery[e.colis], "colis"),
      }));
      /*     var grouped = _.mapValues(_.groupBy(anomalies, "colis"), (clist) =>
        clist.map((car) => _.omit(car, "colis"))
      );
      let result = [];
      _.mapKeys(grouped, (value, key) => {
        colis.forEach((c1) => {
          console.log(c1);
          if (c1.id === key) {
            result.push({ colis: c1, anomalies: value });
          }
        });
      }); */
      var count = anomalies.length;
      var rows = anomalies;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (anomalies.length === 0) {
        return res.json({
          message: "pickups   not found  ",
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
 * /change/delivery:
 *   put:
 *     summary: colis from anomaly to delivery.
 *     tags:
 *       - anomaly
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
 *              anomaly:
 *                   type: string
 *                   description: the anomaly message ID
 *                   example: 16696f40-e0d0-11eb-b809-d123ca2078da
 *              colis:
 *                  type: uuid
 *                  example: "8c9b7f81-e0dc-11eb-a938-c3de66044796"
               
 
 *     responses:
 *       201:
 *         description:  anomaly delivery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 */
 app.put(
  "/change/delivery",
  [authJwt.verifyToken], 
  async (req, res, next) => {
    try {
     
      const { anomaly, colis } = req.body;
      app.db
        .transaction(async (trx) => {
         console.log(anomaly,colis)
          
         await trx.table("anomaly_delivery") .delete().where("id", "=", anomaly).andWhere('colis', "=",colis)
         const[ tentatif]= await trx.table("delivery").select("id","tentatif", "driver").where("colis", "=", colis)

          await trx
          .table("delivery")
          .update({
            status_anomaly: 0,
            status_delivery: 1,
            updated_at: new Date(),
            tentatif: 0,
          })
          .where("id", "=", tentatif.id);

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: tentatif.id,
            colis: colis,
            actionneurs: req.userId,
            agence:req.agence,
            event: "dispatch aprés retour",
          });
          
        
        
        })
        .then(function () {
         

          res.status(200).json({
            message: "delivery anomay update",
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
      console.log(error);
    }
  }
);