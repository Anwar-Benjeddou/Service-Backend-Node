const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /admin/pickup/count:
 *   get:
 *     summary: statistic pickup (number of pickup ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardAdmin

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: pickup not found 
 *
 */
app.get(
  "/statistic/admin/pickup/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const providers = await app.db
        .from("provider " + " as p")
        .select("p.id")
        .join("app_user as u ", "u.id", "p.id")
       
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        ).andWhere("etat_final", "=",0)
        .andWhere("status_delivery_exchange", "=", 0)
        const idcolis1 = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        )
      const [pickupTotal] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere(
          "colis",
          "IN",
          idcolis1.map((e) => e.id)
        )

      const [pickupPending] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        ).andWhere("check_magasinier", "=", 0)

      const [pickupOnGoing] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 1)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        ).andWhere("check_magasinier", "=", 0)
      const [pickupEnleve] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        ).andWhere("check_magasinier", "=", 0)
        const [pickupEnleve_check] = await app.db
        .table("pickup")
        .count({ count: ["status_pickup"] })
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        ).andWhere("check_magasinier", "=", 1)
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
        pickupEnleve_check:pickupEnleve_check.count,
        pickupTotal: pickupTotal.count,
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
 * /admin/colis/count:
 *   get:
 *     summary: statistic pickup (number of pickup ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardAdmin

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: colis not found 
 *
 */
app.get("/statistic/admin/colis/count", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence_user = req.agence;
    const id_colis = await app
    .db("colis")
    .select("id")
    .andWhere("etat_final", "=",0)
    const [deliveryTotal] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      const [deliveryPending] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 0)
     // .andWhere("check_magasinier", "=", 0)

      const [deliveryPending_check] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 0)
     // .andWhere("check_magasinier", "=", 1)

    const [deliveryOnGoing] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 1)
     // .andWhere("check_magasinier", "=", 0)

    const [deliveryDone] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      //.andWhere("check_magasinier", "=", 0)
      .andWhere("etat_payment", "=", 0)
      .andWhere("colis", "IN", id_colis.map(el=>el.id))
      const [deliveryencaissed] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      //.andWhere("check_magasinier", "=", 0)
      .andWhere("etat_payment", "=", 1)
      .andWhere("colis", "IN", id_colis.map(el=>el.id))


      const colisyencaissed = await app.db
      .table("delivery")
      .select("colis")
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .andWhere("etat_payment", "=", 0)
      .andWhere("colis", "IN", id_colis.map(el=>el.id))
  
      const[ total_payment] = await app.db("colis").table("colis")
      .sum("price")
      .where(
        "id",
        "IN",
        colisyencaissed.map((el) => el.colis)
      );
console.log(total_payment)
    const [deliveryAnomaly] = await app.db
      .table("delivery")
      .count({ count: ["status_delivery"] })
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 1)
   
    const [ticket] = await app
      .db("ticket")
      .count({ count: ["status"] })
      .where("status", "=", 0)
      .andWhere(
        "colis",
        "IN",
        id_colis.map((colis) => colis.id)
      );
    res.json({
      deliveryDelivery: deliveryDone.count,
      deliveryOnGoing: deliveryOnGoing.count,
      deliveryPending: deliveryPending.count,
      deliveryPending_check:deliveryPending_check.count,
      deliveryAnomaly: deliveryAnomaly.count,
      delivery: deliveryTotal.count,
      deliveryencaissed:deliveryencaissed.count,
      
      ticket: ticket.count,
      total_payment:total_payment.sum
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
/**
 * @swagger
 * /console_from/count:
 *   get:
 *     summary: statistic console (number of console ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardAdmin

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: colis not found 
 *
 */
app.get(
  "/statistic/console_from/count",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const id_colis = await app.db.table("colis").select("id").where("etat_final", "=", 0)
      const [exchangeTotal] = await app
        .db("console")
        .count({ count: ["status_console"] })

      const [exchangePending] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 0)
      //  .andWhere("check_magasinier_from", "=", 0)

      const [exchangeOnGoing] = await app
        .db("console")
        .count({ count: ["status_console"] })
        .where("status_console", "=", 1)
        //.andWhere("check_magasinier_from", "=", 0)

      const exchangeDone = (await app
        .db("console as c")
        .andWhere("status_console", "=", 2)
        .andWhere("status_console_Delivery", "=", 0)
        .andWhere("colis", "IN", id_colis.map(el=>el.id))).length 

      res.json({
        exchangeDone: exchangeDone,
        exchangeOnGoing: exchangeOnGoing.count,
        exchangePending: exchangePending.count,
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
 * /console_to/count:
 *   get:
 *     summary: statistic console (number of console ongoing/pending/done).
 *     description: Retrieve a statistic pickup.
 *     tags:
 *       - dashboardAdmin

 *     responses:
 *       200:
 *         decription: statistic fetched 
 *       400:
 *         description: console not found 
 *
 */
app.get("/statistic/console_to/count", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence_user = req.agence;

    const [exchangeTotal] = await app
      .db("console")
      .count({ count: ["status_console"] })

    const [exchangePending] = await app
      .db("console")
      .count({ count: ["status_console"] })
      .where("status_console", "=", 0)
      .andWhere("check_magasinier_to", "=", 0)

    const [exchangeOnGoing] = await app
      .db("console")
      .count({ count: ["status_console"] })
      .where("status_console", "=", 1)
      .andWhere("check_magasinier_to", "=", 0)

    const [exchangeDone] = await app
      .db("console")
      .count({ count: ["status_console"] })
      .where("status_console", "=", 2)
      .andWhere("check_magasinier_to", "=", 0)

    res.json({
      exchangeDone: exchangeDone.count,
      exchangeOnGoing: exchangeOnGoing.count,
      exchangePending: exchangePending.count,
      exchangeTotal: exchangeTotal.count,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
