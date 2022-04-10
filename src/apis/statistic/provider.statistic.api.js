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
  console.log("here");
  console.log("startDate", typeof startDate);
  console.log("endDate", typeof endDate);
  console.log("id_provider", id_provider);

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

/**
 * @swagger
 * /statistics/provider/delivery/topFive:
 *   get:
 *     summary: statistics top 5 provider have delivery.
 *     description: list of of anomaly by driver betwenn to date.
 *     tags:
 *       - statistic
 *     parameters:
 
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
/******* Top 5 provider en livraision */

app.get("/statistics/provider/delivery/topFive", async (req, res, next) => {
  const { startDate, endDate } = req.query;
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  try {
    const idcolissTest = await app.db.table("colis").select("provider", "id");
    /* const grouped = _.groupBy(idcolissTest, colis =>
           colis.provider
          ); */
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    var rows125 = (
      await app.db
        .from("provider " + " as p")
        .select("*")
        .join("app_user as u ", "u.id", "p.id")
    ).map((e) => ({
      ...e,
      agence: agence[e.agence],
    }));

    const total5 = await app.db
      .table("delivery")
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .where("updated_at", ">=", startDate)
      .where("updated_at", "<=", endDate);

    let arr123 = total5.map((key, index) => {
      let temp = idcolissTest.find((element) => element.id === key.colis);
      return temp;
    });
    //console.log(arr123);
    const mp = new Map(arr123.map((o) => [o.provider, { ...o, count: 0 }]));
    for (const { provider } of arr123) mp.get(provider).count++;
    const result = Array.from(mp.values());
    //console.log(result);

    let arr96 = result.map((e, i) => {
      let temp = rows125.find((element) => element.id === e.provider);
      return { infos_provider: temp, provider_statistic: parseInt(e.count) };
    });

    // console.log(arr96);

    let filtered = arr96
      .filter((row) => row.provider_statistic > 0)
      .sort((a, b) =>
        a.provider_statistic < b.provider_statistic
          ? 1
          : b.provider_statistic < a.provider_statistic
          ? -1
          : 0
      )
      .slice(0, 4);

    res.json({
      status: 200,
      data: filtered,
      startDate: startDate,
      endDate: endDate,
    });
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

