const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

const env = require("../../../env");
const accountSid1 = "ACd849aed8c9db3985d47820b28149a391";
const authToken1 = "ff8308c97f94493af2312e99a0f49d45";
const client1 = require("twilio")(accountSid1, authToken1);
const accountSid = "AC8e7493d5401093bbc33d1cb66fbb1137";
const authToken = "645087c8802bcaf61df2fdf34d179fdc";
const client = require("twilio")(accountSid, authToken);
const uploadAvatar = require("../../middlewares/upload-avatar");
const storage = require("../../middlewares/upload-avatar");

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     anomaly_delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The privilege ID.
 *           example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         driver:
 *             type: string
 *             description: the driver ID
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *         colis:
 *             type: string
 *             description: the colis ID
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *         anomaly:
 *             type: string
 *             description: the anomaly message ID
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 
 *         status_replanifier:
 *             type: integer
 *             description: the status replanifier anomaly
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *         image:
 *             type: file
 *             description: the anomaly message ID
 

 *
 */

/**
 * @swagger
 * /delivery/anomaly/add:
 *   post:
 *     summary: create anomaly pickup and update stuts anomaly in pickup to 1 and reset value of driver.
 *     tags:
 *       - mobile_anomaly_delivery_driver
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
 *                     colis:
 *                       type: string
 *                       description: The package's IDs.
 *                       example:  "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 */
app.post(
  "/delivery/anomaly/add",
  [authJwt.verifyToken],
  uploadAvatar,
  storage,
  async (req, res, next) => {
    try {
      const { anomaly, colis } = req.body;
      app.db
        .transaction(async (trx) => {
          let imageURL = "";
          if (req.file) {
            // return res.status(400).send('No files were uploaded.');
            const file = req.file;
            const avatarId = `${uuid.v4()}.png`;
            imageURL = `http://${file.originalname}/${avatarId}`;
            file.fieldname.mv(env.assetDirectory + imageURL);
          }
          await trx.table("anomaly_delivery").insert({
            id: uuid.v1().toLocaleUpperCase(),
            driver: req.userId,
            anomaly: anomaly,
            colis: colis,
            image: imageURL,
            note: req.body.note
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
            agence:req.agence,
            event: "anomalie de livraision",
          });
          const [num_tentative_setting] = await app
            .db("setting")
            .select("*")
            .pluck("nb_tentative");
          console.log(num_tentative_setting);
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
          client.messages
            .create({
              body:
                `driver  ` +
                req.userId +
                ` has send message problem PICKUP:` +
                anomaly +
                `\n`,

              from: "+19548665435",
              to: "+21622780702",
            })
            .then((message) => console.log(message.sid));

          client1.messages.create({
            body:
              `driver  ` +
              req.userId +
              ` has send message problem PICKUP :` +
              anomaly +
              `\n`,

            from: "+15406251151",
            to: "+21652534321",
          });

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
