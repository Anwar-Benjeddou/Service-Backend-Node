const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /delivery/check/list:
 *   get:
 *     summary: Retrieve a list of colis for check.
 *     description: Retrieve a list of colis.
 *     tags:
 *       - mobile_checkcolis_magasinier
 *     responses:
 *       200:
 *         description: A list of colis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 
 *       500:
 *         description : Internal server
 */
app.get(
  "/delivery/check/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;

      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const delivery = (
        await app.db
          .table("delivery")
          .andWhere("check_magasinier", "=", 0)
          .where("status_delivery", "=", 0)
          .andWhere("status_anomaly", "=", 0)
          .andWhere("agence_exchange", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      if (delivery.length === 0) {
        return res.json({
          message: "colis   not found  ",
          status: 200,
          data: delivery,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: delivery,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /delivery/do_check:
 *   put:
 *     summary: the storekeeper 'magasinier' validate the packages received
 *     tags:
 *       - mobile_checkcolis_magasinier
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
 
 *              colis:
 *                  type: array
 *                  example:  [ "1323A010-D8EE-11EB-AF2C-7755068897C0", "13224080-D8EE-11EB-AF2C-7755068897C0"]
 *               
 
 *     responses:
 *       201:
 *         description: pickup ongoing
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
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put("/delivery/do_check", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const { colis } = req.body;
    app.db
      .transaction(async (trx) => {
        const delivery = await trx
          .table("delivery")
          .select("*")
          .where(
            "colis",
            "IN",
            colis.map((e) => e)
          );

        for (const pack of delivery) {
          await trx
            .table("delivery")
            .update({
              magasinier: req.userId,
              check_magasinier: 1,
              date_check_magasinier: new Date(),
              updated_at: new Date(),
            })
            .where("id", "=", pack.id)
            .andWhere("check_magasinier", "=", 0)
            .then(async () => {
              await trx.table("colis_history").insert({
                id: uuid.v1().toLocaleUpperCase(),
                action: pack.id,
                colis: pack.colis,
                actionneurs: req.userId,
                agence:req.agence,
              vu_provider:1,

                event: "delivery checked",
              });
            });
        }
      })
      .then(function () {
        res.status(200).json({
          message: "Successfully checked colis",
          status: 200,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
