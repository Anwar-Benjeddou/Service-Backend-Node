const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /provider/pickup/count:
 *   get:
 *     summary: statistic pickup (number of pickup ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardProvider

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */
app.get(
  "/provider/pickup/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);

      const [pickupTotal] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      const [pickupPending] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      const [pickupNotReady] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", -1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      const [pickupOnGoing] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      const [pickupEnleve] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("check_magasinier", "=", 1);

      const [pickupAnomaly] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      res.json({
        pickupEnleve: pickupEnleve.count,
        pickupOnGoing: pickupOnGoing.count,
        pickupPending: pickupPending.count,
        pickupTotal: pickupTotal.count,
        pickupAnomaly: pickupAnomaly.count,
        pickupNotReady: pickupNotReady.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/count/delivery:
 *   get:
 *     summary: statistic delivery (number of delivery ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardProvider

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */
app.get(
  "/provider/count/delivery",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);
      const idcolisse = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0);

      const [deliveryTotal] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      const [deliveryPending] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );

      const [deliveryOnGoing] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      const [deliveryDone] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcolisse.map((e) => e.id)
        );
      // .andWhere("etat_payment", "=", 0)
      // .orWhere("status_delivery", "=", 2)
      // .andWhere("status_anomaly", "=", 1)
      // .andWhere("etat_payment", "=", 0)

      const id_colis_sum = await app.db
        .table("delivery")
        .select("colis")
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcolisse.map((e) => e.id)
        );
      const [sum_delivery] = await app.db
        .table("colis")
        .sum("price")
        .where(
          "id",
          "IN",
          id_colis_sum.map((el) => el.colis)
        );
        const id_colis_sum_pending = await app.db
        .table("delivery")
        .select("colis")
        .where("status_delivery", "=", 0)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcolisse.map((e) => e.id)
        );
      const [sum_delivery_pending] = await app.db
        .table("colis")
        .sum("price")
        .where(
          "id",
          "IN",
          id_colis_sum_pending.map((el) => el.colis)
        );
        const id_colis_sum_ongoing = await app.db
        .table("delivery")
        .select("colis")
        .where("status_delivery", "=", 1)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcolisse.map((e) => e.id)
        );
      const [sum_delivery_ongoing] = await app.db
        .table("colis")
        .sum("price")
        .where(
          "id",
          "IN",
          id_colis_sum_ongoing.map((el) => el.colis)
        );
      const [deliveryPaye] = await app.db
        .table("facture")
        .count({ count: ["payment_status_provider"] })
        .andWhere("payment_status_provider", "=", 1)
        .andWhere("payment_status_driver", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      const [num_tentative_setting] = await app
        .db("setting")
        .select("*")
        .pluck("nb_tentative");
      const [retour_provisoir] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("tentatif", "!=", num_tentative_setting)
        .andWhere("check_replanification", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
        const [retour_nonDispatch] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("tentatif", "=", num_tentative_setting)
        .andWhere("check_replanification", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
        console.log(retour_nonDispatch)
      const [retour_final] = await app.db
        .table("retour_provider")
        .count({ count: ["retour_status"] })
        .andWhere("provider", "=", user);

      res.json({
        retour_provisoir: retour_provisoir.count,
        deliveryDone: deliveryDone.count,
        sum_delivery:sum_delivery.sum,
        sum_delivery_pending:sum_delivery_pending.sum,
        sum_delivery_ongoing:sum_delivery_ongoing.sum,
        deliveryOnGoing: deliveryOnGoing.count,
        deliveryPending: deliveryPending.count,
        deliveryTotal: deliveryTotal.count,
        retour_final: retour_final.count,
        deliveryPaye: deliveryPaye.count,
        retour_final_nonDispatch:retour_nonDispatch.count
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/console_from/count:
 *   get:
 *     summary: statistic delivery (number of delivery ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardProvider

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */
app.get(
  "/provider/console_from/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const colis = await app
        .db("colis")
        .select("*")
        .pluck("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0);
      const [exchangeTotal] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 0)
        .andWhere(
          "colis",
          "IN",
          colis.map((e) => e)
        );

      res.json({
        exchangeTotal: exchangeTotal.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /provider/depot/count:
 *   get:
 *     summary: statistic delivery (number of delivery ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardProvider

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */

 app.get(
  "/provider/depot/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const idcoliss = await app
        .db("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("status_delivery_exchange", "=", 0)
        .andWhere("etat_final", "=", 0);
  
      const [depotTotal] = await app.db
      .table("pickup")
      .count("* as count")
      .andWhere("status_pickup", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .andWhere(
        "colis",
        "IN",
        idcoliss.map((e) => e.id)
      )

      res.json({
        depotTotal: depotTotal.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);