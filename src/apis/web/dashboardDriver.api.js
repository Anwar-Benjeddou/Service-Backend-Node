const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /driver/pickup/count:
 *   get:
 *     summary: statistic pickup (number of pickup ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboarddriver

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */
app.get(
  "/driver/pickup/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      const [pickupPending] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 0)
        .andWhere("driver", "=", user);

      const [pickupOnGoing] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 1)
        .andWhere("driver", "=", user);
      const [pickupEnleve] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere("check_magasinier","=", 0)
        .andWhere("driver", "=", user);
      const [pickupAnomaly] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("driver", "=", user);
      res.json({
        pickupEnleve: pickupEnleve.count,
        pickupOnGoing: pickupOnGoing.count,
        pickupPending: pickupPending.count,
        pickupAnomaly: pickupAnomaly.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /driver/colis/count:
 *   get:
 *     summary: statistic pickup (number of pickup ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboarddriver

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: colis not found 
 *
 */
app.get(
  "/driver/colis/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      const [deliveryPending] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 0)
        .andWhere("driver", "=", user);

      const [deliveryOnGoing] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 1)
        .andWhere("driver", "=", user);

      const [deliveryDone] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 2)        
        .andWhere("driver", "=", user)
        .andWhere("etat_payment", "=", 0)       
        .andWhere("status_anomaly", "=", 0);

      const [deliveryAnomaly] = await app.db
        .table("delivery")
        .count({ count: ["status_delivery"] })
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        .andWhere("etat_payment", "=", 0)
        .andWhere("driver", "=", user)
        .andWhere("check_retour", "=",0)
        .andWhere("check_magasinier", "=", 0)





      res.json({
        deliveryDelivery: deliveryDone.count,
        deliveryOnGoing: deliveryOnGoing.count,
        deliveryPending: deliveryPending.count,
        deliveryAnomaly: deliveryAnomaly.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /driver/console/count:
 *   get:
 *     summary: statistic console (number of console ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboarddriver

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: console not found 
 *
 */
app.get(
  "/driver/console/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      const [exchangePending] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 0)
        .andWhere("driver", "=", user);

      const [exchangeOnGoing] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 1)
        .andWhere("driver", "=", user);

      const [exchangeDone] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 2)
        .andWhere("driver", "=", user);

      res.json({
        exchangeDone: exchangeDone.count,
        exchangeOnGoing: exchangeOnGoing.count,
        exchangePending: exchangePending.count,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);
app.get(
  "/driver/money/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      const [money] = await app.db
      .from("driver " + " as p")
      .select("*")
      .where("p.id", "=", user)
      .join("app_user as u ", "u.id", "p.id")
      res.json({
        Total_money: money.frais_livraision,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);