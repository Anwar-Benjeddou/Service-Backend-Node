const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");
const _ = require("lodash");

/**
 * @swagger
 * /forcing/pickup:
 *   post:
 *     summary: Create new colis and new pickup in forcing when provider don't have account. 
 *     description: when creating a client there is the creation of a pickup.
 *     tags:
 *      - forcing
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               agence:
 *                type: string
 *                description: The colis agence.
 * 
 *               data:
 *                 type: array 
 *                 description: The article values.
 *                 example: [ {phone_number : 0, designation : "", type_envoi : "",gouvernorat : "",address : "mars rue 23", "city":"marsa",email: "customr@gmail.com",name_complete: "aziza themri",code_postal: "4567",price: 45,weight: 4,payment_status: 0,payment_mode: "cach"},{phone_number : 0,designation : "", type_envoi : "",gouvernorat : "",address: "SFAX" , city: "cite ones",email: "colis3@gmil.com",name_complete: "badis dadou",code_postal: "5654",price: 56,weight: 3,payment_status: 1,payment_mode: "check",}]
 *
 *     responses:
 *       201:
 *         description: New colis created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/colis'

 
 */

app.post("/forcing/pickup", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const data = req.body.data; // Read excel document to js array
    const iduser = req.userId;
    const agence_user = req.agence;
    const [nb_colis_setting] = await app.db("setting");

    let nb_colis = 0;
    await app.db
      .transaction(async (trx) => {
        for (let d of data) {
          nb_colis++;
          const idpickup = uuid.v1().toLocaleUpperCase();
          const idcolis = uuid.v1().toLocaleUpperCase();
          const idPay = uuid.v1().toLocaleUpperCase();
          await trx.table("colis").insert({
            id: idcolis,
            index_colis: nb_colis_setting
              ? nb_colis_setting.nb_colis + nb_colis
              : nb_colis,
            address: d.addresse,
            city: d.ville,
            gouvernorat: d.gouvernorat.toUpperCase(),
            email: d.email,
            phone_number: d.N_telephone,
            name_complete: d.nom_client,
            code_postal: d.code_postal,
            price: d.prix,
            weight: d.weight,
            payment_status: d.prix === 0 ? "1" : " 0",

            payment_mode: d.mode_payment,
            type_envoi: d.type_envoi,
            designation: d.designation,
            provider: req.body.provider,
            agence: req.body.agence ? req.body.agence : agence_user,
            code: "CODE-" + Math.floor(1000 + Math.random() * 9000),

            lot: d.lot ? parseInt(d.lot) : 1,
          });

          await trx.table("pickup").insert({
            id: idpickup,
            code:
              "PICKUP-" + nb_colis_setting
                ? nb_colis_setting.num_pickup + nb_colis
                : nb_colis,
            colis: idcolis,
            status_pickup: 0,
            date_enlevement_souhaiter: new Date(),
          });

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: idPay,
            colis: idcolis,
            actionneurs: iduser,
            agence: req.agence,
            event: "pickup créer ",
            vu_provider: 1,
          });
          if (nb_colis_setting) {
            await trx
              .table("setting")
              .update({
                nb_colis: nb_colis_setting.nb_colis + data.length,
                num_pickup: nb_colis_setting.num_pickup + data.length,
              })
              .where("id", "=", nb_colis_setting.id);
          }
        }
      })
      .then(async () => {
        res.status(201).json({
          message: "New colis/pickup created",
          status: 201,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a colis."));
  }
});

/**
 * @swagger
 * /forcing/pickup/to_ready:
 *   put:
 *     summary: update status package to pending (status=0).
 *     tags:
 *       - forcing
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
  *             colis:
 *               type: string
 *               example:   "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "03de03c4-64fd-40e8-ba8c-b7273d06f83f"
 */
app.put(
  "/forcing/pickup/to_ready",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const [pickups] = await trx
            .table("pickup")
            .select("*")
            .where("colis", "=", req.body.colis);

          await trx
            .table("pickup")
            .update({ status_pickup: 0, updated_at: new Date() })
            .where("id", "=", pickups.id);
          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: pickups.id,
            colis: req.body.colis,
            actionneurs: req.userId,
            agence: req.agence,
            event: " pickup prêt ",
            vu_provider: 1,
          });
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully forcing",
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

/**
 * @swagger
 * /forcing/pickup/to_ongoing:
 *   put:
 *     summary: update status package to ongoing (status=1).
 *     tags:
 *       - forcing
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
 
 *             colis:
 *               type: string
 *               example:   "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "03de03c4-64fd-40e8-ba8c-b7273d06f83f"
 */
app.put(
  "/forcing/pickup/to_ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const [pickups] = await trx
            .table("pickup")
            .select("*")
            .where("colis", "=", req.body.colis);

          await trx
            .table("pickup")
            .update({ status_pickup: 1, updated_at: new Date() })
            .where("id", "=", pickups.id)
            .andWhere("status_pickup", "=", 0);
          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: pickups.id,
            colis: req.body.colis,
            actionneurs: req.userId,
            agence: req.agence,
            event: " pickup en cours",
            vu_provider: 1,
          });
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully forcing",
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

/**
 * @swagger
 * /forcing/pickup/to_done:
 *   put:
 *     summary: update status package to ongoing (status=1).
 *     tags:
 *       - forcing
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
 
 *             colis:
 *               type: string
 *               example:   "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "03de03c4-64fd-40e8-ba8c-b7273d06f83f"
 */
app.put(
  "/forcing/pickup/to_done",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const [pickups] = await trx
            .table("pickup")
            .select("*")
            .where("colis", "=", req.body.colis);

          await trx
            .table("pickup")

            .update({
              status_pickup: 2,
              date_enlevement: new Date(),
              updated_at: new Date(),
            })
            .where("id", "=", pickups.id)
            .andWhere("status_pickup", "=", 1);
          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: pickups.id,
            colis: req.body.colis,
            actionneurs: req.userId,
            agence: req.agence,
            event: " pickup en cours ",
            vu_provider: 1,
          });
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully forcing",
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

/**
 * @swagger
 *  /forcing/delivery/to_ongoing:
 *   put:
 *     summary: update status delivery to ongoing (status=1).
 *     tags:
 *       - forcing
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
 *               type: string
 *               example:  ""
 
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
 *                       type: string
 *                       description: The colis's IDs.
 *                       example:  ""

 */
app.put(
  "/forcing/delivery/to_ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;

      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const [delivery] = await trx
            .table("delivery")
            .select("*")
            .where("colis", "=", colis);
          if (delivery) {
            await trx
              .table("delivery")
              .update({ status_delivery: 1, updated_at: new Date() })
              .where("id", "=", delivery.id)
              .andWhere("status_delivery", "=", 0);
            await trx
              .table("colis")
              .update({ status_delivery_exchange: 2, updated_at: new Date() })
              .where("id", "=", delivery.colis);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: delivery.id,
              colis: delivery.colis,
              actionneurs: user,
              agence: req.agence,
              event: " livraision en cours",
              vu_provider: 1,
            });
            res.status(201).json({
              message: "Successfully forcing colis",
              status: 201,
              data: req.body,
            });
          } else {
            res.status(404).json({
              message: "not found",
              status: 404,
              data: req.body,
            });
          }
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
 * /forcing/delivery/to_done:
 *   put:
 *     summary: update status delivery to done (status=2).
 *     tags:
 *       - forcing
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

 *             colis:
 *               type: string
 *               example:  ""
 
 *     responses:
 *       201:
 *         description: livraision terminé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 

 *                     colis:
 *                       type: string
 *                       description: The colis's IDs.
 *                       example:  ""

 */
app.put(
  "/forcing/delivery/to_done",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis, price } = req.body;

          const [delivery] = await trx
            .table("delivery")
            .select("*")
            .where("colis", "=", colis);
         

          if (delivery) {
            const [driver] = await trx
            .table("driver")
            .select("frais_livraision")
            .where("id", "=", delivery.driver);
            
            const exist_InFacture = await trx
              .table("facture")
              .select("colis")
              .where(
                "colis",
                "=",
                colis
              );
              let to_remove = _.unionBy(
                exist_InFacture,
                "colis"
              ).map(el=>el.colis)
              const filtred = _.sortedUniq([colis]).filter((el) => {
                return !to_remove.includes(el);
              });
            console.log(exist_InFacture,filtred);
            if (filtred.length > 0) {
              const info_colis = await trx
              .table("colis")
              .select("*")
              .where("id", "IN", filtred.map(el=>el));
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
              await trx
                .table("driver")
                .update({
                  frais_livraision: driver.frais_livraision + price,
                })
                .where("id", "=", delivery.driver);

              await trx.table("colis_history").insert({
                id: uuid.v1().toLocaleUpperCase(),
                action: delivery.id,
                colis: delivery.colis,
                actionneurs: req.userId,
                agence: req.agence,
                event: " livraision terminé ",
                vu_provider: 1,
              });
              await trx
                .table("delivery")
                .update({
                  status_delivery: 2,
                  date_livraision: new Date(),
                  updated_at: new Date(),
                })
                .where("id", "=", delivery.id)
                .andWhere("status_delivery", "=", 1);
                res.status(201).json({
                  message: "Successfully updated colis",
                  status: 201,
                  data: req.body,
                });
            }

           
          } else {
            res.status(404).json({
              message: "not found",
              status: 404,
              data: req.body,
            });
          }
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
 * /forcing/delivery/anomaly/add:
 *   post:
 *     summary: create anomaly pickup and update stuts anomaly in pickup to 1 and reset value of driver.
 *     tags:
 *       - forcing
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
 *              driver:
 *                    type: string
 *                    description: the driver ID
 *                    example: f95a5560-e0c8-11eb-abdd-014ed3bc7a01
 *              anomaly:
 *                   type: string
 *                   description: the anomaly message ID
 *                   example: 16696f40-e0d0-11eb-b809-d123ca2078da
 *
 *              colis:
 *                  type: uuid
 *                  example: 
               
 
 *     responses:
 *       201:
 *         description:  anomaly delivery
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
 *                       description: the driver ID
 *                       example: f95a5560-e0c8-11eb-abdd-014ed3bc7a01
 
 *
 *                     anomaly:
 *                        type: string
 *                        description: the anomaly message ID
 *                        example: 16696f40-e0d0-11eb-b809-d123ca2078da                      
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 */
app.post(
  "/forcing/delivery/anomaly/add",
  [authJwt.verifyToken],

  async (req, res, next) => {
    try {
      const { anomaly, colis, driver } = req.body;
      app.db
        .transaction(async (trx) => {
          let imageURL = "";

          await trx.table("anomaly_delivery").insert({
            id: uuid.v1().toLocaleUpperCase(),
            driver: driver,
            anomaly: anomaly,
            colis: colis,
            image: imageURL,
          });
          const [delivery] = await trx("delivery").where("colis", "=", colis);
          const [category] = await trx("anomaly_message")
            .select("category")
            .where("id", "=", anomaly);
          const [name_category] = await trx("anomaly_category")
            .select("name")
            .where("id", "=", category.category);

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: delivery.id,
            colis: colis,
            actionneurs: req.userId,
            agence: req.agence,
            event: "  anomalie de livraision ",
            vu_provider: 1,
          });
          const [num_tentative_setting] = await app
            .db("setting")
            .select("*")
            .pluck("nb_tentative");
          if (name_category.name === "ANNULATION") {
            await trx
              .table("delivery")
              .update({
                status_anomaly: 1,
                status_delivery: 2,
                updated_at: new Date(),
                tentatif: num_tentative_setting,
                check_replanification: 0,
              })
              .where("id", "=", delivery.id);
          } else {
            await trx
              .table("delivery")
              .update({
                status_anomaly: 1,
                status_delivery: 2,
                updated_at: new Date(),
                tentatif: delivery.tentatif + 1,
                check_replanification: 0,
              })
              .where("id", "=", delivery.id);
          }
        })
        .then(function () {
          res.status(200).json({
            message: "Anomaly send",
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
    }
  }
);

/**
 * @swagger
 * /forcing/console/to_done:
 *   put:
 *     summary: update status console to ongoing (status=1).
 *     tags:
 *       - forcing
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
app.put(
  "/forcing/console/to_done",
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
              agence: req.agence,
              event: " transfert terminé ",
              vu_provider: 1,
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
 * /forcing/delivery/reverse:
 *   put:
 *     summary: update status delivery to done (status=2).
 *     tags:
 *       - forcing
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

 *             colis:
 *               type: string
 *               example:  ""
 
 *     responses:
 *       201:
 *         description: livraision terminé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 

 *                     colis:
 *                       type: string
 *                       description: The colis's IDs.
 *                       example:  ""

 */
 app.put(
  "/forcing/delivery/reverse",
  [authJwt.verifyToken],
  async (req, res, next) => {
    console.log(req.body)
    try {
      app.db
        .transaction(async (trx) => {
          const { colis, price } = req.body;

          const [delivery] = await trx
            .table("delivery")
            .select("*")
            .where("colis", "=", colis);
         

       
         
              await trx.table("facture").delete()
              .where(
                "colis",
                "=",
                colis
              );
          
              await trx.table("colis_history").insert({
                id: uuid.v1().toLocaleUpperCase(),
                action: delivery.id,
                colis: delivery.colis,
                actionneurs: req.userId,
                agence: req.agence,
                event: " colis non terminé",
                vu_provider: 1,
              });
              await trx
                .table("delivery")
                .update({
                  status_delivery: 1,
                  date_livraision: new Date(),
                  updated_at: new Date(),
                })
                .where("id", "=", delivery.id)
                .andWhere("status_delivery", "=", 2);
                res.status(201).json({
                  message: "Successfully updated colis",
                  status: 201,
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
