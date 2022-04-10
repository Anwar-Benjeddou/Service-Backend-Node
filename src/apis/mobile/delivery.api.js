const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

const accountSid = "AC8e7493d5401093bbc33d1cb66fbb1137";
const authToken = "645087c8802bcaf61df2fdf34d179fdc";
const client = require("twilio")(accountSid, authToken);
const _ = require("lodash");

/**
 * @swagger
 * components:
 *   schemas:
 *     colis:
 *       type: object
 *       properties:
 *
 *         code_postal:
 *          type: string
 *          description: The colis's code_postal.
 *          example: oumaima
 *         name_complete:
 *          type: string
 *          description: The colis's name_complete.
 *          example: oumaima
 *         pickup:
 *          type: string
 *          description: The colis's pickup.
 *          example: oumaima
 *         phone_number:
 *          type: string
 *          description: The colis's  phone number,
 *          example: 50998877
 *         address:
 *          type: string
 *          description: The colis's address.
 *          example: TUNIS, marsa
 *         price:
 *          type: intger
 *          description: The colis's price.
 *          example: 44.44
 *         weight:
 *          type: intger
 *          description: The colis's weight.
 *          example: 20
 *         email:
 *          type: string
 *          description: The colis's email.
 *          example: email@gmail.com
 *         status_delivery_exchange:
 *          type: string
 *          description: colis delivery status.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 *         payment_status:
 *          type: string
 *          description: The colis's payment Status can be 0 or 1 if the colis paid.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 *         payment_mode:
 *          type: string
 *          description: Mode of payment can be Checks, cards or  cash.
 *          example: Check
 *         city:
 *          type: string
 *          description: The colis's city.
 *          example: manar
 *         street:
 *          type: string
 *          description: The colis's payment_status.
 *          example: compus
 *         type_envoi:
 *          type: string
 *          description: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *          example: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *         designation:
 *          type: string
 *          description: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *          example: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 */

/**
 * @swagger
 * /delivery/driver/list:
 *   get:
 *     summary: Retrieve a list of colis
 *     description: Retrieve a list of colis .
 *     tags:
 *       - mobile_delivery_driver
 *     responses:
 *       200:
 *         description: A list of colis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/colis'
 *       500:
 *         description : Internal server
 */
app.get(
  "/delivery/driver/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (await app.db.table("driver")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
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
          .where("driver", "=", req.userId)
          .andWhere("etat_payment", "=", 0)
         // .andWhere("check_magasinier", "=", 1)
          .andWhere("check_retour", "=", 0)
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
 * /delivery/to_ongoing:
 *   put:
 *     summary: update status delivery to ongoing (status=1).
 *     tags:
 *       - mobile_delivery_driver
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
 *
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
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
app.put(
  "/delivery/to_ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const delivery = await trx
            .table("delivery")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );
          //.andWhere("check_magasinier", "=",1)
          for (const elmdelivery of delivery) {
            await trx
              .table("delivery")
              .update({ status_delivery: 1, updated_at: new Date() })
              .where("id", "=", elmdelivery.id);

            await trx
              .table("colis")
              .update({ status_delivery_exchange: 2, updated_at: new Date() })
              .where("id", "=", elmdelivery.colis);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: elmdelivery.id,
              colis: elmdelivery.colis,
              actionneurs: user,
              agence: req.agence,
              event: "livraision en cours",
            });
            client.messages.create({
              body:
                `Mr   ` +
                elmdelivery.id +
                ` Your colis in route  with driver ` +
                user +
                `\n`,

              from: "+19548665435",
              to: "+21622780702",
            });
          }
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
    }
  }
);

/**
 * @swagger
 * /delivery/to_done:
 *   put:
 *     summary: update status delivery to done (status=2).
 *     tags:
 *       - mobile_delivery_driver
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
 *             price:          # <!--- form field name
 *               type: double
 *               example:  0.0
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
 *                       example:  []

 */
app.put("/delivery/to_done", [authJwt.verifyToken], async (req, res, next) => {
  try {
    app.db
      .transaction(async (trx) => {
        const { colis, price } = req.body;
        const [driver] = await trx
          .table("driver")
          .select("frais_livraision")
          .where("id", "=", req.userId);

        const delivery = await trx
          .table("delivery")
          .select("*")
          .where(
            "colis",
            "IN",
            colis.map((e) => e)
          );
        //.andWhere("check_magasinier", "=",1)
        if (delivery.length > 0) {
          const update_delivery = delivery.map(() => {
            return {
              status_delivery: 2,
              date_livraision: new Date(),
              updated_at: new Date(),
            };
          });

          const history = delivery.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "livraision terminé",
            };
          });

          const exist_InFacture = await trx
            .table("facture")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((el) => el)
            );
          let to_remove = _.unionBy(exist_InFacture, "colis").map(
            (el) => el.colis
          );
          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });

          if (filtred.length > 0) {
            const info_colis = await trx
              .table("colis")
              .select("*")
              .where(
                "id",
                "IN",
                filtred.map((e) => e)
              );
            const facture = info_colis.map((colis) => {
              const id = uuid.v1().toLocaleUpperCase();

              if (colis.payment_status === "paid")
                return {
                  id: id,
                  colis: colis.id,
                  payment_status_customer: 1,
                  delivery_status: 1,
                  mode_payment: 1,
                  provider: colis.provider,
                };
              else {
                return {
                  id: id,
                  colis: colis.id,
                  payment_status_customer: 1,
                  delivery_status: 1,
                  provider: colis.provider,
                };
              }
            });
            await trx.table("facture").insert(facture);
            let compt = 0;
            await trx
              .table("delivery")
              .update(update_delivery[compt++])
              .where(
                "id",
                "IN",
                delivery.map((colis) => colis.id)
              );

            await trx
              .table("driver")
              .update({ frais_livraision: driver ? driver.frais_livraision + price : price})
              .where("id", "=", req.userId);
            await trx.table("colis_history").insert(history);
            res.status(201).json({
              message: "Successfully updated colis",
              status: 200,
              data: req.body,
            });
          } else {
            res.status(201).json({
              message: "exist in facture",
              status: 200,
              data: req.body,
            });
          }
        }
      })

      .catch((err) => {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
