const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");



app.get("/statistics/driver/delivery/topTen", async (req, res, next) => {
  const { startDate, endDate } = req.query;
  try {
    const total = await app.db
      .table("delivery")
      .select("*")
      .pluck("driver")
      .where("status_delivery", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .where("updated_at", ">=", startDate)
      .where("updated_at", "<=", endDate);

    const counts = total.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );
    const MaxTable = Object.fromEntries(
      Object.entries(counts).sort((a, b) => b[1] - a[1])
    );
    const vehicule = (await app.db.table("vehicule")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const zones = (await app.db.from("zone").select("*"))
      .map((e) => ({
        ...e,
        agence: agence[e.agence],
      }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});

    var rows2 = (
      await app.db
        .from("driver " + " as p")
        .select("*")
        .join("app_user as u ", "u.id", "p.id")
    ).map((e) => ({
      ...e,
      agence: agence[e.agence],
      vehicule: vehicule[e.vehicule],
      zone: zones[e.zone],
    }));
    let arr = Object.keys(MaxTable)
      .slice(0, 9)
      .map((e) => {
        let temp = rows2.find((element) => element.id === e);
        return { infos_driver: temp, delivery_statistic: MaxTable[e] };
      });
    res.json({
      status: 200,
      data: arr,
      startDate: startDate,
      endDate: endDate,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /statistics/driver/enlevement:
 *   get:
 *     summary: statistics enlevement by driver.
 *     description: statistics enlevement by driver.
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
app.get("/statistics/driver/enlevement", async (req, res, next) => {
  const { startDate, endDate, id } = req.query;
  console.log(startDate)
  const id_driver = id;
  try {
    const colis = (await app.db.table("colis")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    let flatData = {};
    if (
      startDate !== (undefined || "") &&
      endDate !== (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      flatData = (
        await app.db
          .from("pickup")
          .select("*")
          .where("driver", "=", id_driver)
          //.whereBetween('updated_at', [startDate, endDate])
          .where("updated_at", ">=", startDate)
          .where("updated_at", "<=", endDate)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));

      res.json({
        message: "enlevement list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_enlevement: flatData.length,
        startDate: startDate,
        endDate: endDate,
      });
    }

    if (
      startDate === (undefined || "") &&
      endDate === (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      flatData = (
        await app.db.from("pickup").select("*").where("driver", "=", id_driver)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));
      //.whereBetween('updated_at', [startDate, endDate])
      res.json({
        message: "transfert list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_enlevement: flatData.length,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      res.json({
        message: "insert startDate ,endDate and driverId",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /statistics/driver/delivery:
 *   get:
 *     summary: statistics delivery by driver.
 *     description: statistics delivery by driver.
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
app.get("/statistics/driver/delivery", async (req, res, next) => {
  const { startDate, endDate, id } = req.query;
  const id_driver = id;
  try {
    const colis = (await app.db.table("colis")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    let flatData = {};
    if (
      startDate !== (undefined || "") &&
      endDate !== (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      flatData = (
        await app.db
          .from("delivery")
          .select("*")
          .where("driver", "=", id_driver)
          //.whereBetween('updated_at', [startDate, endDate])
          .where("updated_at", ">=", startDate)
          .where("updated_at", "<=", endDate)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));

      res.json({
        message: "delivery list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_delivery: flatData.length,
        startDate: startDate,
        endDate: endDate,
      });
    }else if (
      startDate === (undefined || "")  ||
      endDate === (undefined || "") 
    ) {
      flatData = (
        await app.db
          .from("delivery")
          .select("*")
          .where("driver", "=", id_driver)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));
      //.whereBetween('updated_at', [startDate, endDate])
      res.json({
        message: "delivery list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_delivery: flatData.length,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      res.json({
        message: "insert startDate ,endDate and driverId",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
/**
 * @swagger
 * /statistics/driver/transfert:
 *   get:
 *     summary: statistics console by driver.
 *     description: statistics console by driver.
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
app.get("/statistics/driver/transfert", async (req, res, next) => {
  const { startDate, endDate, id } = req.query;
  const id_driver = id;
  try {
    const colis = (await app.db.table("colis")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    let flatData = {};
    if (
      startDate !== (undefined || "") &&
      endDate !== (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      flatData = (
        await app.db
          .from("console")
          .select("*")
          .where("driver", "=", id_driver)
          //.whereBetween('updated_at', [startDate, endDate])
          .where("updated_at", ">=", startDate)
          .where("updated_at", "<=", endDate)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));
      res.json({
        message: "transfert list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_anomaly: flatData.length || 0,
        startDate: startDate,
        endDate: endDate,
      });
    }
    if (
      startDate === (undefined || "") &&
      endDate === (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      flatData = (
        await app.db.from("console").select("*").where("driver", "=", id_driver)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
      }));
      //.whereBetween('updated_at', [startDate, endDate])
      res.json({
        message: "transfert list",
        status: 200,
        driver: id_driver,
        data: flatData,
        total_anomaly: flatData.length || 0,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      res.json({
        message: "insert startDate ,endDate and driverId",
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
/**
 * @swagger
 * /statistic/driver/anomaly/dominate:
 *   get:
 *     summary: Retrieve a list of anomaly by driver betwenn to date.
 *     description: list of of anomaly by driver betwenn to date.
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
app.get("/statistic/driver/anomaly/dominate", async (req, res, next) => {
  try {
    const { startDate, endDate, id } = req.query;
    const id_driver = id;
    console.log(startDate);
    console.log(endDate);
    let flatData = {};

    if (
      startDate !== (undefined || "") &&
      endDate !== (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      console.log("here1");
      flatData = await app.db
        .from("anomaly_delivery")
        .select("*")
        .where("driver", "=", id_driver)
        .where("updated_at", ">=", startDate)
        .where("updated_at", "<=", endDate)
        .pluck("anomaly");
    }

    if (
      startDate === (undefined || "") &&
      endDate === (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      console.log("here2");
      flatData = await app.db
        .from("anomaly_delivery")
        .select("*")
        .where("driver", "=", id_driver)
        .pluck("anomaly");
    }
    //console.log(flatData);

    const counts = flatData.reduce(
      (acc, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );

    let Max = Math.max(...Object.values(counts));
    var highestVal = Math.max.apply(null, Object.values(counts)),
      val = Object.keys(counts).find(function (a) {
        return counts[a] === highestVal;
      });
    //console.log(val);
    let dominateMessage = "";
    if (val !== undefined) {
      [dominateMessage] = await app.db
        .from("anomaly_message")
        .select("*")
        .where("id", "=", val)
        .pluck("message");
    }
    if (parseInt(Max) > 0) {
      res.json({
        message: "Anomaly Dominate",
        status: 200,
        dominateAnomaly: dominateMessage || "",
        totalAnomaly: parseInt(Max) || 0,
      });
    }

    if (parseInt(Max) === 0) {
      res.json({
        message: "Anomaly Dominate",
        status: 201,
        dominateAnomaly: "",
        totalAnomaly: 0,
      });
    }
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /statistic/anomaly/driver:
 *   get:
 *     summary: statistics anomaly by driver
 *     description: statistics anomaly by driver
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
app.get("/statistic/anomaly/driver", async (req, res, next) => {
  const { startDate, endDate, id } = req.query;
  const id_driver = id;
  try {
    console.log("here5");
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    console.log("id_driver", id_driver);
    /*  let flatData={} */

    const anomaly = (await app.db.table("anomaly_message")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const colis = (await app.db.table("colis")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    if (
      startDate !== (undefined || "") &&
      endDate !== (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      console.log("here1");
      let flatData = (
        await app.db
          .from("anomaly_delivery")
          .select("*")
          .where("driver", "=", id_driver)
          .where("updated_at", ">=", startDate)
          .where("updated_at", "<=", endDate)
      ).map((e) => ({
        ...e,
        anomaly: anomaly[e.anomaly],
        colis: colis[e.colis],
      }));
      res.json({
        message: "anomaly list",
        status: 200,
        //driver: id_driver,
        data: flatData,
        total_anomaly: flatData.length || 0,
        startDate: startDate,
        endDate: endDate,
      });
    }

    if (
      startDate === (undefined || "") &&
      endDate === (undefined || "") &&
      id_driver !== (undefined || "")
    ) {
      console.log("here2");
      let flatData = (
        await app.db
          .from("anomaly_delivery")
          .select("*")
          .where("driver", "=", id_driver)
      ).map((e) => ({
        ...e,
        anomaly: anomaly[e.anomaly],
        colis: colis[e.colis],
      }));

      res.json({
        message: "anomaly list",
        status: 200,
        //driver: id_driver,
        data: flatData,
        total_anomaly: flatData.length || 0,
        startDate: startDate,
        endDate: endDate,
      });
    }

    //const resultMap = flatData;

    /* else  {
      res.json({
        message: "insert startDate ,endDate and driverId",
        status: 200,
      });
    } */
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
