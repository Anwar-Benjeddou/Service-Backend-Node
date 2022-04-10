const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /statistics/provider/pickup:
 *   get:
 *     summary: statistics a list of pickup by provider.
 *     description: statistics a list of pickup by provider.
 *     tags:
 *       - statistic
 *     parameters:
 *         - in: query
 *           name: id
 *           schema:
 *             type: string
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: startDate
 *           schema:
 *             type: string
 *           description: The numbers of items to return
 *         - in: query
 *           name: endDate
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *     responses:
 *       200:
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */
app.get("/statistics/provider/pickup", async (req, res, next) => {
  const { startDate, endDate, id } = req.query;
  const id_provider = id;
 

  try {
    if (
      (typeof startDate === undefined || typeof startDate === "string") &&
      (typeof endDate === undefined || typeof startDate === "string") &&
      typeof id_provider !== undefined
    ) {
      console.log("here1");
      const idcoliss = await app.db
        .table("colis")
        .select("*")
        .where("provider", "=", id_provider)
        .where("updated_at", ">=", startDate)
        .where("updated_at", "<=", endDate);
      //console.log(idcoliss)

      const [total] = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      //constconsole.log(total)
      var count = total.count;
      //console.log(count)
      const [total1] = await app.db
        .table("pickup")
        .count("* as count")
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      //console.log(total1)
      var count1 = total1.count;
      //console.log(count1)

      res.json({
        status: 200,
        provider: id_provider,
        delivery: count,
        pickup: count1,
        startDate: startDate,
        endDate: endDate,
      });
    }
    if (
      (typeof startDate === undefined || typeof startDate !== "string") &&
      (typeof endDate === undefined || typeof endDate !== "string") &&
      typeof id_provider !== undefined
    ) {
      console.log("here2");
      const idcoliss = await app.db
        .table("colis")
        .select("*")
        .where("provider", "=", id_provider);
      //console.log(idcoliss)

      const [total] = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      //constconsole.log(total)
      var count = total.count;
      //console.log(count)
      const [total1] = await app.db
        .table("pickup")
        .count("* as count")
        .where("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        );
      //console.log(total1)
      var count1 = total1.count;
      //console.log(count1)

      res.json({
        status: 200,
        provider: id_provider,
        delivery: count,
        pickup: count1,
        startDate: startDate,
        endDate: endDate,
      });
    }

    /*   } */

    /* else{
          res.json({
            message: "insert startDate ,endDate and driverId",
            status: 200,
          })
        } */
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
