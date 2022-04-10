const app = require("../../../index");
const uuid = require("uuid");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
/**
 * @swagger
 * components:
 *   schemas:
 *
 *     anomaly_category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The privilege ID.
 *           example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         name:
 *             type: string
 *             description: the name anomaly
 *             example: PICKUP || DELIVERY
 *     anomaly_message:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The privilege ID.
 *           example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         message:
 *             type: string
 *             description: the cause of an anomaly.
 *             example: colis is not ready
 *         category:
 *             type: string
 *             description: the cause of an anomaly.
 *             example: colis is not ready
 *
 */

/**
 * @swagger
 * /anomaly/create:
 *   post:
 *     summary: Create  a new  type of anomaly with possible causes.
 *     tags:
 *       - config_anomaly
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
 *             name:          # <!--- form field name
 *               type: string
 *               example:  anomalyPickup
 *             messages:
 *               type: array
 *               example:  [ "colis not ready", "broken colis"]
 *               required:
 *                - name
 
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The anoamly ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f *
 *                     name:
 *                       type: string
 *                       description: The anomaly's name.
 *                       example: PICKUP
 *                     messages:
 *                       type: array
 *                       description: The anoamly's message.
 *                       example:  [ "colis not ready", "broken colis"]
 */
app.post("/anomaly/create", [authJwt.verifyToken], async (req, res, next) => {
  try {
    app.db
      .transaction(async (trx) => {
        const existName = await app
          .db("anomaly_category as m")
          .where("name", "=", req.body.name.toLocaleUpperCase());

        if (existName.length === 0) {
          const idCat = uuid.v1().toLocaleUpperCase();

          await trx.table("anomaly_category").insert({
            id: idCat,
            name: req.body.name.toLocaleUpperCase(),
          });
          try {
            for (let message of req.body.messages) {
              const idMesg = uuid.v1().toLocaleUpperCase();

              await trx.table("anomaly_message").insert({
                id: idMesg,
                message: message,
                category: idCat,
              });
            }
          } catch (error) {
            console.log(error);
            next(new createHttpError.BadRequest(error));
          }
        } else {
          try {
            for (let message of req.body.messages) {
              const idMesg = uuid.v1().toLocaleUpperCase();

              await trx.table("anomaly_message").insert({
                id: idMesg,
                message: message,
                category: existName[0].id,
              });
            }
          } catch (error) {
            next(new createHttpError.BadRequest(error));
          }
        }
      })
      .then(() => {
        res.status(201).json({
          message: "Successfully created anomaly category",
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
    next(new createHttpError.BadRequest("Invalid values to create a driver."));
  }
});

/**
 * @swagger
 * /anomaly/{id}:
 *   put:
 *     summary: Update anomaly message.
 *     description: Updates a single anomaly message.
 *     tags:
 *       - config_anomaly
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:

 *             messages:
 *               type: array
 *               example:  [  {id: "3F13D040-D97B-11EB-AF02-0FE9BF17DCA6",message: "colis not ready"}, {id: "3F141E60-D97B-11EB-AF02-0FE9BF17DCA6",message: "broken colis"}]
 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the anomaly message to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400 :
 *         description: name shoud have minmum one item
 *       500:
 *         description:  Invalid values to update a zone
 *
 */
app.put("/anomaly/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    app.db.transaction(async (trx) => {
      try {
        for (let message of req.body.messages) {
          await trx
            .table("anomaly_message")
            .update({
              message: message.message,
            })
            .where("id", "=", message.id);
        }
      } catch (error) {
        next(new createHttpError.BadRequest(error));
      }

      res.status(200).json({
        message: "Successfully updated",
        status: 200,
        data: req.body,
      });
    });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /anomaly/pickup:
 *   get:
 *     summary: Retrieve a list anomaly messages.
 *     description: Retrieve a listanomaly messages .
 *     tags:
 *       - config_anomaly
 *     responses:
 *       200:
 *         description: A list of anomaly messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/anomaly_message'
 *       500:
 *         description : Internal server
 */

app.get("/anomaly/pickup", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const [category] = await app
      .db("anomaly_category as m")
      .select("*")
      .where("name", "=", "PICKUP");
    let rows = [];
    if (category) {
      rows = (
        await app.db("anomaly_message").where("category", "=", category.id)
      ).map((e) => ({ ...e, category: category }));
      if (rows.length === 0) {
        return res.json({
          message: "anomaly messege not found ",
          status: 200,
          data: rows,
        });
      }
    }

    res.json({
      message: "anomaly messege fetched",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /anomaly/pickup/{id}:
 *   get:
 *     summary: Retrieve a single anomaly.
 *     description: Retrieve a single anomaly.
 *     tags:
 *       - config_anomaly
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: zones fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get(
  "/anomaly/pickup/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "PICKUP");

      const rows = (
        await app.db("anomaly_message").andWhere("category", "=", req.params.id)
      ).map((e) => ({ ...e, category: category }));

      if (rows.length === 0) {
        return res.json({
          message: "anomaly messege not found ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "anomaly messege fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * /anomaly/delivery:
 *   get:
 *     summary: Retrieve a list anomaly delivery messages.
 *     description: Retrieve a list anomaly messages .
 *     tags:
 *       - config_anomaly
 *     responses:
 *       200:
 *         description: A list of anomaly messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/anomaly_message'
 *       500:
 *         description : Internal server
 */

app.get(
  "/anomaly/delivery",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const category = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "DELIVERY")
        .orWhere("name", "=", "ANNULATION");

      const rows = (
        await app.db("anomaly_message").where(
          "category",
          "IN",
          category.map((e) => e.id)
        )
      ).map((e) => ({
        ...e,
        category: category.filter((a) => a.id === e.category)[0],
      }));
      if (rows.length === 0) {
        return res.json({
          message: "anomaly messege not found ",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "anomaly messege fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /anomaly/delivery/pickup/{id}:
 *   get:
 *     summary: Retrieve a single anomaly delivery.
 *     description: Retrieve a single anomaly.
 *     tags:
 *       - config_anomaly
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: zones fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get(
  "/anomaly/delivery/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const [category] = await app
        .db("anomaly_category as m")
        .select("*")
        .where("name", "=", "DELIVERY");

      const rows = (
        await app.db("anomaly_message").andWhere("category", "=", req.params.id)
      ).map((e) => ({ ...e, category: category }));

      if (rows.length === 0) {
        return res.json({
          message: "anomaly messege not found ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "anomaly messege fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);
