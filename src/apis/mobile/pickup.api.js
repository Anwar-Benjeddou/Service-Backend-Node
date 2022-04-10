const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");
let _ = require("lodash");
/**
 * @swagger
 * /driver/pickup/provider/pending:
 *   get:
 *     summary: Retrieve a list of pickup grouped by provider status 0.
 *     description: Retrieve a list of pickup.
 *     tags:
 *       - mobile_pickup_driver
 *     responses:
 *       200:
 *         description: A list of pickup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *
 *       500:
 *         description : Internal server
 */

app.get(
  "/driver/pickup/provider/pending",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      const driverId = req.userId;
      const provider = await app.db
        .table("provider as p")
        .join("app_user as u ", "u.id", "p.id");
      const colis = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const pickup = (
        await app.db
          .table("pickup")
          .select("colis", "code")
          .where("driver", "=", driverId)
          .andWhere("check_magasinier", "=", 0)
          .andWhere("status_pickup", "=", 0)
      ).map((e) => ({
        ...e,

        colis: colis[e.colis],
      }));

      var grouped = _.mapValues(_.groupBy(pickup, "colis.provider"), (clist) =>
        clist.map((car) => _.omit(car, "colis.provider"))
      );
      let result = [];
      _.mapKeys(grouped, (value, key) => {
        provider.forEach((p1) => {
          if (p1.id === key) {
            console.log(p1);
            result.push({ provider: p1, pickups: value, total: value.length });
          }
        });
      });
      if (pickup.length === 0) {
        return res.json({
          message: "pickups  not found for pickup",
          status: 200,
          data: pickup,
        });
      }
      res.json({
        message: "pickup messege fetched",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
/**
 * @swagger
 * /driver/pickup/provider/done:
 *   get:
 *     summary: Retrieve a list of pickup grouped by provider status 2.
 *     description: Retrieve a list of pickup.
 *     tags:
 *       - mobile_pickup_driver
 *     responses:
 *       200:
 *         description: A list of pickup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *
 *       500:
 *         description : Internal server
 */

app.get(
  "/driver/pickup/provider/done",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      const driverId = req.userId;
      const provider = await app.db
        .table("provider as p")
        .join("app_user as u ", "u.id", "p.id");
      const colis = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((all, colis) => ({ ...all, [colis.id]: colis }), {});
      const id_colis = await app.db
        .table("colis")
        .select("id")
        .where("etat_final", "=", 0);
      const pickup = (
        await app.db
          .table("pickup")
          .select("code", "colis")
          .where("driver", "=", driverId)
          .andWhere("status_pickup", "=", 2)
          .andWhere("check_magasinier", "=", 0)
          .andWhere(
            "colis",
            "IN",
            id_colis.map((el) => el.id)
          )
      ).map((pickups) => ({
        ...pickups,

        colis: colis[pickups.colis],
      }));

      var grouped = _.mapValues(_.groupBy(pickup, "colis.provider"), (clist) =>
        clist.map((colis) => _.omit(colis, "colis.provider"))
      );

      let result = [];
      _.mapKeys(grouped, (value, key) => {
        provider.forEach((p1) => {
          if (p1.id === key) {
            console.log(p1);
            result.push({ provider: p1, pikups: value });
          }
        });
      });

      if (pickup.length === 0) {
        return res.json({
          message: "pickups  not found for pickup",
          status: 200,
          data: pickup,
        });
      }
      res.json({
        message: "pickup messege fetched",
        status: 200,
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @swagger
 * /driver/pickup/list:
 *   get:
 *     summary: Retrieve a list of pickup.
 *     description: Retrieve a list of pickup.
 *     tags:
 *       - mobile_pickup_driver
 *     responses:
 *       200:
 *         description: A list of pickup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *
 *       500:
 *         description : Internal server
 */

app.get("/driver/pickup/list", [authJwt.verifyToken], async (req, res) => {
  try {
    const driverId = req.userId;
    const provider = (
      await app.db.table("provider as p").join("app_user as u ", "u.id", "p.id")
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

    const idcolis = await app.db.table("colis").where("etat_final", "=", 0);
    const pickup = (
      await app.db
        .table("pickup")
        .select("*")
        .where("driver", "=", driverId)
        .andWhere("check_magasinier", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcolis.map((el) => el.id)
        )
    ).map((e) => ({
      ...e,

      colis: colis[e.colis],
    }));

    if (pickup.length === 0) {
      return res.json({
        message: "pickups  not found for pickup",
        status: 200,
        data: pickup,
      });
    }
    res.json({
      message: "pickup messege fetched",
      status: 200,
      data: pickup,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @swagger
 * /driver/pickup/to_ongoing:
 *   put:
 *     summary: update status package to ongoing (status=1).
 *     tags:
 *       - mobile_pickup_driver
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
 
 *             coliss:
 *               type: array
 *               example:  [ "8c9b7f81-e0dc-11eb-a938-c3de66044796", "8caf0781-e0dc-11eb-a938-c3de66044796"]
 
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/driver/pickup/To_ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
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
                status_pickup: 1,
                updated_at: new Date(),
              })
              .where("id", "=", pack.id);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "pickup en cours",
            });
          }
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully updated package",
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /driver/pickup/to_done:
 *   put:
 *     summary: update status package to done (status=2).
 *     tags:
 *       - mobile_pickup_driver
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
 
 *             coliss:
 *               type: array
 *               example:  [ "8c9b7f81-e0dc-11eb-a938-c3de66044796", "8caf0781-e0dc-11eb-a938-c3de66044796"]

 
 *     responses:
 *       201:
 *         description: pickup done
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/driver/pickup/to_done",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
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
                status_pickup: 2,
                date_enlevement: new Date(),
                updated_at: new Date(),
              })
              .where("id", "=", pack.id);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "pickup terminé",
            });
          }
        })
        .then(function () {
          console.log("Transaction complete.");
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /driver/pickup/to_ongoing/provider:
 *   put:
 *     summary: update status package to ongoing (status=1) by provider.
 *     tags:
 *       - mobile_pickup_driver
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
 
 *             provider:
 *               type: string
 *               example:   "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 *               required:
 *                - name
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 
 
 *                     provider:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "03de03c4-64fd-40e8-ba8c-b7273d06f83f"
 */
app.put(
  "/driver/pickup/To_ongoing/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const idcolis = await trx
            .table("colis")
            .select("id")
            .where("provider", "=", req.body.provider);
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              idcolis.map((e) => e.id)
            );
          for (const pack of pickups) {
            await trx
              .table("pickup")
              .update({ status_pickup: 1, updated_at: new Date() })
              .where("id", "=", pack.id)
              .andWhere("status_pickup", "=", 0);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "pickup en cours",
            });
          }
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully updated package",
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /driver/pickup/to_done/provider:
 *   put:
 *     summary: update status package to done (status=2) by provider.
 *     tags:
 *       - mobile_pickup_driver
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

 *             provider:
 *               type: string
 *               example:  "8c9b7f81-e0dc-11eb-a938-c3de66044796"


 *     responses:
 *       201:
 *         description: pickup done
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 
 
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/driver/pickup/to_done/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const idcolis = await trx
            .table("colis")
            .select("id")
            .where("provider", "=", req.body.provider);
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              idcolis.map((e) => e.id)
            );

          for (const pack of pickups) {
            await trx
              .table("pickup")
              .update({
                status_pickup: 2,
                date_enlevement: new Date(),
                updated_at: new Date(),
              })
              .where("id", "=", pack.id)
              .andWhere("status_pickup", "=", 1);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "pickup terminé",
            });
          }
        })
        .then(function () {
          console.log("Transaction complete.");
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);
