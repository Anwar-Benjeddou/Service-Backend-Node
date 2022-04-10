const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
let _ = require("lodash");


/**
* @swagger
* /colis/script/code:
*   put:
*     summary: Update code colis.
*     description: Updates a code colis.
*     tags:
*       - colis
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
 
*               phone_number:
*                 type: integer
*                 description: The client's phone_number.
*               address:
*                 type: string
*                 description: The client's address.
*               city:
*                 type: string
*                 description: The client's city.

*     responses:
*       200:
*         description: Successfully updated
*       400 :
*         description: name shoud have minmum one item
*       500: 
*         description:  Invalid values to update a colis
*       
*/
app.put(
  "/colis/script/code",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const colis = await app
      .db("colis")
      .select("*")
      .pluck("id")
  
    

     
    colis.map(async (elcolis) => {
      await app.db
        .table("colis")
        .update({code: "CODE-" + Math.floor(1000 + Math.random() * 9000),
        updated_at: new Date() })
        .where("id", "=", elcolis)
      })

      res.status(201).json({
        message: "Successfully updated colis",
        status: 201,
        data: "",
      });
          
       
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  }
);


/**
* @swagger
* /colis/update/{id}:
*   put:
*     summary: Update colis.
*     description: Updates a single colis.
*     tags:
*       - colis
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
 
*               phone_number:
*                 type: integer
*                 description: The client's phone_number.
*               address:
*                 type: string
*                 description: The client's address.
*               city:
*                 type: string
*                 description: The client's city.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: String ID of the colis to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successfully updated
*       400 :
*         description: name shoud have minmum one item
*       500: 
*         description:  Invalid values to update a colis
*       
*/
app.put(
  "/colis/update/:id",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      /* const exist = await app
      .db("delivery")
      .where("colis", "=", req.params.id)
      .andWhere("status_delivery", "=", "2")
      .orWhere("status_delivery", "=", "1")
      .andWhere("colis", "=", req.params.id);
    console.log(exist); */
      await app.db
        .table("colis")
        .update({ ...req.body, updated_at: new Date() })
        .where("id", "=", req.params.id)
        .then((rows) => {
          if (rows.length === 0) {
            return res.json({
              message: "colis not found with the given id",
              status: 200,
              data: req.body,
            });
          }
          res.status(200).json({
            message: "Successfully updated",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  }
);

/**
* @swagger
* /accord/colis:
*   put:
*     summary: Update colis.
*     description: Updates a single colis.
*     tags:
*       - colis
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:

*               zone:
*                 type: string
*                 description: The zone.
*               colis:
*                 type: 
*                 description: The colis.

*     responses:
*       200:
*         description: Successfully updated

*       500: 
*         description:  internal server error
*       
*/
app.put(
  "/accord/colis",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const { colis, zone } = req.body;
      const update_colis = colis.map(() => {
        return {
          zone: zone,
          updated_at: new Date(),
        };
      });
      let compt = 0;
      await app.db
        .table("colis")
        .update(update_colis[compt++])
        .where(
          "id",
          "IN",
          colis.map((id) => id)
        )
        .then((rows) => {
          if (rows.length === 0) {
            return res.json({
              message: "Colis not found with the given id",
              status: 200,
              data: req.body,
            });
          }
          res.status(200).json({
            message: "Successfully updated",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  }
);

/**
 * @swagger
 * /admin/colis/zone/{id}:
 *   get:
 *     summary: pick-up list to be assigned to the driver by zone for delivery or exchange
 *     description: list of pickup for each user per zone of driver.
 *     tags:
 *       - colis
 
 *     parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: String ID of the zone to retrieve.
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
  "/admin/colis/zone/:id",
  /*  [authJwt.verifyToken], */
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

      // const agence_user = req.agence;

      /*  const providers = await app.db
      .from("provider as p")
      .join("app_user as u ", "u.id", "p.id")
      .select("p.id")
      .where("agence", "=", agence_user); */
      const coliss = (await app.db.table("colis").where("etat_final", "=",0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        //.where("agence", "=", agence_user)
        .where("status_delivery_exchange", "=", 0)
        .andWhere("zone", "=", req.params.id)
        .andWhere("etat_final", "=",0)

      /* .where(
        "provider",
        "IN",
        providers.map((e) => e.id)
      ) */

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
        .andWhere("status_pickup", "=", 2)
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
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
          .andWhere("status_pickup", "=", 2)
      )
        .map((e) => ({
          ...e,
          colis: coliss[e.colis],
          driver: driver[e.driver],
        }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
 * /admin/colis/filter/{info}:
 *   get:
 *     summary: filtre colis 
 *     description: list of colis.
 *     tags:
 *       - colis
 
 *     parameters:
 *         - in: path
 *           name: info
 *           required: true
 *           description: String ID of the zone to retrieve.
 *           schema:
 *           type: string

 *     responses:
 *       200:
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
 app.get(
  "/admin/colis/filter/:info",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      console.log(req.roles[0]);
      const provider = (
        await app.db
          .table("provider as p")

          .join("app_user as u ", "u.id", "p.id")
          .select("p.id", "u.firstname")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      let coliss;

      if (req.roles[0] === "ROLE_PROVIDER") {
        coliss = (
          await app.db
            .table("colis")
            .select("*")
            .where("provider", "=", req.userId)
        ).map((e) => ({
          ...e,
          provider: provider[e.provider],
        }));
      } else {
        coliss = (
          await app.db
            .table("colis")
            .select("*")


        ).map((e) => ({
          ...e,
          provider: provider[e.provider],
        }));
      }

      let filtred = [];
      coliss.forEach((item) => {
        let exist = Object.values(item).filter((elm) => elm == req.params.info);
        if (exist.length) {
          filtred.push(item);
        }
      });
      const result = _.without(filtred, null, "", undefined);

      if (result.length === 0) {
        return res.json({
          message: "colis   not found  ",
          status: 200,
          data: filtred,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: filtred,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);