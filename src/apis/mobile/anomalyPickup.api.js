const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
//const authJwt = require("../../middlewares/auth");
const env = require("../../../env");
const authJwt = require("../../middlewares/auth");

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
 *     anomaly_pickup:
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
 *         pickup:
 *             type: string
 *             description: the package ID
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *         anomaly:
 *             type: string
 *             description: the anomaly message ID
 *             example: 18ECCAA0-D59F-11EB-A9E7-AF3C119556D5
 *         image:
 *             type: file
 *             description: the anomaly message ID
 

 *
 */

/**
 * @swagger
 * /pickup/anomaly/add:
 *   post:
 *     summary: create anomaly pickup and update stuts anomaly in pickup to 1 and reset value of driver.
 *     tags:
 *       - mobile_anomaly_driver
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
 
 
 *              coliss:
 *                  type: array
 *                  example:  [ "8c9b7f81-e0dc-11eb-a938-c3de66044796", "8caf0781-e0dc-11eb-a938-c3de66044796"]
               
 
 *     responses:
 *       201:
 *         description:  anomaly pickup
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
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "8c9b7f81-e0dc-11eb-a938-c3de66044796", "8caf0781-e0dc-11eb-a938-c3de66044796"]

 */
app.post(
  "/pickup/anomaly/add",
  uploadAvatar,
  storage,
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          let imageURL = "";
          if (req.file) {
            // return res.status(400).send('No files were uploaded.');
            const file = req.file;

            const avatarId = `${uuid.v4()}.png`;
            imageURL = `http://${file.originalname}/${avatarId}`;
            file.fieldname.mv(env.assetDirectory + imageURL);
          }
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              req.body.coliss.map((e) => e)
            );
          for (const pack of pickups) {
            await trx.table("anomaly_pickup").insert({
              id: uuid.v1().toLocaleUpperCase(),
              driver: req.userId,
              pickup: pack.id,
              anomaly: req.body.anomaly,
              image: imageURL,
            });
            await trx
              .table("pickup")
              .update({
                status_anomaly: 1,
                status_pickup: 2,
                driver: null,
                updated_at: new Date(),
              })
              .where("id", "=", pack.id);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "anomaly pickup",
            });
          }
        })
        .then(function () {
          client.messages
            .create({
              body:
                `driver  ` +
                req.userId +
                ` has send message problem PICKUP:` +
                req.body.anomaly +
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
              req.body.anomaly +
              `\n`,

            from: "+15406251151",
            to: "+21652534321",
          });

          res.status(200).json({
            message: "Successfully updated package",
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
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);
