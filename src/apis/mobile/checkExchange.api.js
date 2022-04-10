const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /console_to/check/list:
 *   get:
 *     summary: Retrieve a list of console for check.
 *     description: Retrieve a list of console.
 *     tags:
 *       - mobile_checkconsole_magasinier
 *     responses:
 *       200:
 *         description: A list of console.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/exchange'
 *       500:
 *         description : Internal server
 */

app.get(
  "/console_to/check/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const exchanges = (
        await app
          .db("console as c")
          .where("c.to_agence", "=", agence_user)
          .andWhere("c.status_console", "=", 2)
          .andWhere("c.check_magasinier_to", "=", 0)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));

      if (exchanges.length === 0) {
        return res.json({
          message: "exchange  not found  ",
          status: 200,
          data: exchanges,
        });
      }
      res.json({
        message: "exchange fetched",
        status: 200,
        data: exchanges,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /console_from/check/list:
 *   get:
 *     summary: Retrieve a list of console for check.
 *     description: Retrieve a list of console.
 *     tags:
 *       - mobile_checkconsole_magasinier
 *     responses:
 *       200:
 *         description: A list of console.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/exchange'
 *       500:
 *         description : Internal server
 */

app.get(
  "/console_from/check/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const exchanges = (
        await app
          .db("console as c")

          .where("c.from_agence", "=", agence_user)
          .andWhere("c.status_console", "=", 0)
          .andWhere("c.check_magasinier_from", "=", 0)
      ).map((e) => ({
        ...e,
        colis: colis[e.colis],
        driver: driver[e.driver],
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
      }));

      if (exchanges.length === 0) {
        return res.json({
          message: "exchange  not found ",
          status: 200,
          data: exchanges,
        });
      }
      res.json({
        message: "exchange fetched",
        status: 200,
        data: exchanges,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /console_from/do_check:
 *   put:
 *     summary: the storekeeper 'magasinier' validate the console received
 *     tags:
 *       - mobile_checkconsole_magasinier
 *     requestBody:
 *       name: Optional description in *Markdown*
 *
 *       decription: Optional description in *Markdown*
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:

 *             colis:
 *                type: array
 *                example:  []
 *
 *     responses:
 *       201:
 *         description: check console
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 
 *                     colis:
 *                       type: array
 *                       example:  [ ]
 */
app.put(
  "/console_from/do_check",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const { colis } = req.body;
      app.db
        .transaction(async (trx) => {
          const consoles = await trx
            .table("console as c")
            .select("*")
            .where(
              "c.colis",
              "IN",
              colis.map((e) => e)
            );
          const data = consoles.map(() => {
            return {
              magasinier_from: req.userId,
              check_magasinier_from: 1,
              status_console:1,
              date_check_magasinier_from: new Date(),
            };
          });
          const history = consoles.map((console) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: console.id,
              colis: console.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "checked exchange from",
              vu_provider:1
            };
          });
          let i = 0;
          await trx("console")
            .update(data[i++])
            .where(
              "id",
              "IN",
              consoles.map((console) => console.id)
            );
          await trx("colis_history").insert(history);
        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated console",
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
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /console_to/do_check:
 *   put:
 *     summary: the storekeeper 'magasinier' validate the console received
 *     tags:
 *       - mobile_checkconsole_magasinier
 *     requestBody:
 *       name: Optional description in *Markdown*
 *
 *       decription: Optional description in *Markdown*
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object       
 *            properties:
 
 *             colis:
 *                type: array
 *                example:  []
 *
 *     responses:
 *       201:
 *         description: check console
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: array
 *                       example:  [ ]
 */
app.put(
  "/console_to/do_check",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const { colis } = req.body;
      app.db
        .transaction(async (trx) => {
          const consoles = await trx
            .table("console as c")
            .select("*")
            .where(
              "c.colis",
              "IN",
              colis.map((e) => e)
            );
          const data = consoles.map(() => {
            return {
              magasinier_to: req.userId,
              check_magasinier_to: 1,
              status_console:2,
              date_check_magasinier_to: new Date(),
              updated_at: new Date(),
            };
          });
          const history = consoles.map((console) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: console.id,
              colis: console.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "checked exchange to",
              vu_provider:1
            };
          });
          let i = 0;
          await trx("console")
            .update(data[i++])
            .where(
              "id",
              "IN",
              consoles.map((console) => console.id)
            );
          await trx("colis_history").insert(history);
        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated console",
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
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
