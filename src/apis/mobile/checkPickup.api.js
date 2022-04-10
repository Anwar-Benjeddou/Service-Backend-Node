const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * /magasinier/check_pickup/list:
 *   get:
 *     summary: Retrieve a list of pickup for check.
 *     description: Retrieve a list of pickup.
 *     tags:
 *       - mobile_checkpickup_magasinier
 *     responses:
 *       200:
 *         description: A list of pickup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/package'
 *       500:
 *         description : Internal server
 */
app.get(
  "/magasinier/check_pickup/list",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      const agence_user = req.agence;

      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const provider = (await app.db.table("provider")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const colis = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const providerId = await app.db
        .from("provider as p")
        .select("p.id")
        .join("app_user as u ", "u.id", "p.id")
        .where("agence", "=", agence_user);

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where(
          "provider",
          "IN",
          providerId.map((e) => e.id)
        ).andWhere("etat_final", "=", 0)

      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .where("status_pickup", "=", 2)
          .andWhere("status_anomaly", "=", 0)
          .andWhere("check_magasinier", "=", 0)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        driver: driver[e.driver],
        colis: colis[e.colis],
      }));

      if (pickups.length === 0) {
        return res.json({
          message: "pickup   not found  ",
          status: 200,
          data: pickups,
        });
      }
      res.json({
        message: "pickup fetched",
        status: 200,
        data: pickups,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @swagger
 * /magasinier/to_check/pickup:
 *   put:
 *     summary: the storekeeper 'magasinier' validate the packages received
 *     tags:
 *       - mobile_checkpickup_magasinier
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
 *              magasinier:
 *                   type: string
 *                   description: the magasinier  ID
 *                   example: 1ba24600-e0c9-11eb-abdd-014ed3bc7a01
 *              coliss:
 *                  type: array
 *                  example: [ "8c9b7f81-e0dc-11eb-a938-c3de66044796","8caf0781-e0dc-11eb-a938-c3de66044796"]

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
 
 
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/magasinier/to_check/pickup",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              req.body.coliss.map((e) => e)
            );
          for (const pack of pickups) {
            await trx
              .table("pickup")
              .update({
                magasinier: req.userId,
                check_magasinier: 1,
                status_pickup: 2,
                date_check_magasinier: new Date(),
                updated_at: new Date(),
              })
              .andWhere("check_magasinier", "=", 0)
              .where("id", "=", pack.id)
              .then(async () => {
                await trx.table("colis_history").insert({
                  id: uuid.v1().toLocaleUpperCase(),
                  action: pack.id,
                  colis: pack.colis,
                  actionneurs: req.userId,
                  agence:req.agence,
                  vu_provider:1,

                  event: "checked pickup",
                });
              });
          }
        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated pickup",
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);
