const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /console/driver/list:
 *   get:
 *     summary: Retrieve a list of console
 *     description: Retrieve a list of console .
 *     tags:
 *       - mobile_console_driver
 *     responses:
 *       200:
 *         description: A list of console.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *
 *       500:
 *         description : Internal server
 */
app.get(
  "/console/driver/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driverId = req.userId;
      const colis = (await app.db.table("colis").where("etat_final", "=", 0)).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const exchanges = (
        await app.db("console as c").where("c.driver", "=", driverId)
      ).map((e) => ({
        ...e,
        from_agence: agence[e.from_agence],
        to_agence: agence[e.to_agence],
        colis: colis[e.colis],
      }));

      if (exchanges.length === 0) {
        return res.json({
          message: "console not found ",
          status: 200,
          data: exchanges,
        });
      }
      res.json({
        message: "console fetched",
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
 * /console/to_ongoing:
 *   put:
 *     summary: update status console to ongoing (status=1).
 *     tags:
 *       - mobile_console_driver
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
 *             driver:          # <!--- form field name
 *               type: string
 *               example:  18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *             colis:
 *               type: array
 *               example:  [ ]
 

 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 

 *                     exchanges:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  [ ]

 */
app.put(
  "/console/to_ongoing",
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
            ).andWhere("check_magasinier_from", "=", 1)
          const ongoing_console = colis.map(() => {
            return {
              status_console: 1,
              updated_at: new Date(),
            };
          });

          let i = 0;
          await trx("console")
            .update(ongoing_console[i++])
            .where(
              "id",
              "IN",
              consoles.map((console) => console.id)
            );

          const colis_history = consoles.map((exchange) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: exchange.id,
              colis: exchange.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "transfert en cours",
              vu_provider:1
            };
          });
          await trx("colis_history").insert(colis_history);
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully updated colis",
            status: 200,
            data: req.body,
          });
        })
        .catch((err) => {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /console/to_done:
 *   put:
 *     summary: update status console to ongoing (status=1).
 *     tags:
 *       - mobile_console_driver
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
 *             driver:          # <!--- form field name
 *               type: string
 *               example:  18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *             colis:
 *               type: array
 *               example:  [ ]
 

 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  [ ]

 */
app.put("/console/to_done", [authJwt.verifyToken], async (req, res, next) => {
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
          ).andWhere("check_magasinier_from", "=", 1)
        const ongoing_console = colis.map(() => {
          return {
            status_console: 2,
            status_console_Delivery: 0,
            updated_at: new Date(),
          };
        });

        let i = 0;
        await trx("console")
          .update(ongoing_console[i++])
          .where(
            "id",
            "IN",
            consoles.map((console) => console.id)
          );

        const colis_history = consoles.map((exchange) => {
          return {
            id: uuid.v1().toLocaleUpperCase(),
            action: exchange.id,
            colis: exchange.colis,
            actionneurs: req.userId,
            agence:req.agence,
            event: "transfert terminé",
            vu_provider:1
          };
        });
        await trx("colis_history").insert(colis_history);
      })
      .then(() => {
        res.status(201).json({
          message: "Successfully updated colis",
          status: 200,
          data: req.body,
        });
      })
      .catch((err) => {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
