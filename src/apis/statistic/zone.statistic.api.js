var _ = require("lodash");
const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/******* Top 5 zones*/
/**
 * @swagger
 * /statistics/zone/delivery/topFive:
 *   get:
 *     summary: Retrieve a list of anomaly by driver betwenn to date.
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

app.get("/statistics/zone/delivery/topFive", async (req, res, next) => {
  const { startDate, endDate } = req.query;
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  try {
    const idcolissTest = await app.db.table("colis").select("zone", "id");
    /* const grouped = _.groupBy(idcolissTest, colis =>
           colis.provider
          ); */
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    var rows125 = (await app.db.table("zone").select("*"))
      /* .join("app_user as u ", "u.id", "p.id") */
      .map((e) => ({
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

    const mp = new Map(arr123.map((o) => [o.zone, { ...o, count: 0 }]));
    for (const { zone } of arr123) mp.get(zone).count++;
    const result = Array.from(mp.values());

    let arr96 = result.map((e, i) => {
      let temp = rows125.find((element) => element.id === e.zone);
      return { infos_zone: temp, zone_statistic: parseInt(e.count) };
    });

    let filtered = arr96
      .filter((row) => row.zone_statistic > 0)
      .sort((a, b) =>
        a.zone_statistic < b.zone_statistic
          ? 1
          : b.zone_statistic < a.zone_statistic
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

/**
 * @swagger
 * /statistics/zone/retour/topFive:
 *   get:
 *     summary: Retrieve a list of anomaly by driver betwenn to date.
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
app.get("/statistics/zone/retour/topFive", async (req, res, next) => {
  const { startDate, endDate } = req.body;

  try {
    /* const total58 = await app.db
          .table("retour_provider")
          .select("*")
          //console.log(total58);
  
  
          const idcolissTest1 = await
          app.db
            .table("colis")
            .select("zone", "id")
           // console.log(idcolissTest1);
  
  
         let arr1234 = total58.map((key, index) => {
              let temp = idcolissTest1.find(element => element.id === key.colis)
              return temp
            })
  
            console.log(arr1234);
  
  
  
            var rows1256 = (
              await app.db
                .table("zone")
                .select("*")
            ).map((e) => ({
              ...e,
              agence: agence[e.agence],
  
            }));
  
  
            console.log(rows1256); */

    const total5 = await app.db.table("retour_provider").select("*");

    const idcolissTest = await app.db.table("colis").select("zone", "id");
    /* const grouped = _.groupBy(idcolissTest, colis =>
           colis.provider
          ); */
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    var rows125 = (await app.db.table("zone").select("*"))
      /* .join("app_user as u ", "u.id", "p.id") */
      .map((e) => ({
        ...e,
        agence: agence[e.agence],
      }));

    /* .where('updated_at', '>=', startDate)
        .where('updated_at', '<=', endDate) */
    //console.log(counts);
    const anomaly_message = (await app.db.table("anomaly_message")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    flatData = await app.db
      .from("anomaly_delivery")
      .select("*")
      .pluck("anomaly");

    var rows1256 = (await app.db.table("anomaly_delivery").select("*"))
      /* .join("app_user as u ", "u.id", "p.id") */
      .map((e) => ({
        ...e,
        anomaly_message: anomaly_message[e.anomaly],
      }));

    console.log(rows1256);

    /* const counts = flatData.reduce((acc, value) => ({
          ...acc,
          [value]: (acc[value] || 0) + 1
        }), {}); */
    /*  console.log(flatData);
      let arr123 = total5.map((key, index) => {
        let temp = idcolissTest.find(element => element.id === key.colis)
        return temp
      }) */

    /* let arr1234 = counts.map((key, index) => {
        //let temp = idcolissTest.find(element => element.id === key.colis)
        return key
      })
      console.log(arr1234); */

    let arr123 = total5.map((key, index) => {
      let temp = idcolissTest.find((element) => element.id === key.colis);
      return temp;
    });

    const mp = new Map(arr123.map((o) => [o.zone, { ...o, count: 0 }]));
    for (const { zone } of arr123) mp.get(zone).count++;
    const result = Array.from(mp.values());
    console.log(result);

    /* let arr967 = result.map((e) => {
          let temp = rows125.find(element => element.id === e.zone)
          return { infos_zone: temp, zone_statistic: parseInt(e.count) }
        })
        console.log(rows1256); */

    let arr96 = result.map((e) => {
      let temp = rows125.find((element) => element.id === e.zone);
      return { infos_zone: temp, zone_statistic: parseInt(e.count) };
    });

    let filtered = arr96
      .filter((row) => row.zone_statistic > 0)
      .sort((a, b) =>
        a.zone_statistic < b.zone_statistic
          ? 1
          : b.zone_statistic < a.zone_statistic
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


app.get(
  "/statistics/zone/anomaly/topFive",
  async (req, res, next) => {
    const { startDate, endDate } = req.query;
    console.log("startDate", startDate);
    console.log("endDate",endDate);
    try {
      const idcolissTest = await
        app.db
          .table("colis")
          .select("zone", "id")
      /* const grouped = _.groupBy(idcolissTest, colis =>
         colis.provider
        ); */
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      var rows125 = (
        await app.db
          .table("zone")
          .select("*")
        /* .join("app_user as u ", "u.id", "p.id") */
      ).map((e) => ({
        ...e,
        agence: agence[e.agence],

      }));

      const total5 = await app.db
        .table("delivery")
        .where("status_delivery", "=", 2)
        .andWhere("status_anomaly", "=", 1)
        /* .where('updated_at', '>=', startDate)
        .where('updated_at', '<=', endDate) */

      let arr123 = total5.map((key, index) => {
        let temp = idcolissTest.find(element => element.id === key.colis)
        return temp
      })

      const mp = new Map(arr123.map(o => [o.zone, { ...o, count: 0 }]));
      for (const { zone } of arr123) mp.get(zone).count++;
      const result = Array.from(mp.values());


      let arr96 = result.map((e, i) => {
        let temp = rows125.find(element => element.id === e.zone)
        return { infos_zone: temp, zone_statistic_anomaly: parseInt(e.count) }
      })

      /* let filtered = arr96.filter(row => row.zone_statistic > 0).sort((a, b) => (a.zone_statistic < b.zone_statistic) ? 1 : ((b.zone_statistic < a.zone_statistic) ? -1 : 0)).slice(0, 4); */


      res.json({
        status: 200,
        data: arr96,
        startDate: startDate,
        endDate: endDate
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

  }
);




