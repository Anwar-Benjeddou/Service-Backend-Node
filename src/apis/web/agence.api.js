const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     agence:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The agence ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         name:
 *          type: string
 *          description: The agence's name.
 *          example: create pickup
 
 *         phone_number:
 *          type: intger
 *          description: The agence's phone number.
 *          example: 71******
 *         address:
 *          type: string
 *          description: The agence's address.
 *          example: TUNIS,lac
 *         city:
 *          type: string
 *          description: The v's name.
 *          example: lac
 */

/**
 * @swagger
 * /addAgence:
 *   post:
 *     summary: Create new agence.
 *     tags:
 *       - agence
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:          # <!--- form field name
 *                type: string
 *                required: true
 *              address:          # <!--- form field name
 *                type: string
 *                required: true
 *
 *              city:          # <!--- form field name
 *                type: string
 *                required: false 
 *              phone_number:          # <!--- form field name
 *                type: number
 *                required: false 
                              
 *         text/plain:
 *           schema:
 *            type: string
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
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     name:
 *                       type: string
 *                       description: The agence's name.
 *                       example: create pickup
*/
app.post(
  "/addAgence",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const id = uuid.v1().toLocaleUpperCase();
      await app.db
        .table(`agence`)
        .insert({
          id: id,
          ...req.body,
        })
        .then(() => {
          res.status(200).json({
            message: "New agence created",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(
        new createHttpError.BadRequest("Invalid values to create a customer.")
      );
    }
  }
);
/**
 * @swagger
 * /agence/{id}:
 *   put:
 *     summary: Update agence.
 *     description: Updates a single agence
 *     tags:
 *       - agence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The agence's name.
 *               phone_number:
 *                 type: intger
 *                 description: The agence's phone number.
 *               address:
 *                 type: string
 *                 description: The agence's address.
 *               city:
 *                 type: string
 *                 description: The v's name.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the agence to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400 :
 *         description: name shoud have minmum one item
 *       500:
 *         description:  Invalid values to update a agence
 *
 */
app.put("/agence/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .table("agence")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then(() => {
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
 * /agence:
 *   get:
 *     summary: Retrieve a list of agences
 *     description: Retrieve a list of agences .
 *     tags:
 *       - agence
 *     responses:
 *       200:
 *         description: A list of agences.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/agence'
 *       500:
 *         description : Internal server
 */

app.get("/agence", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("agence")
      .select("*")
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "agence not found with the given id",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "agence fetched",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /agence/{id}:
 *   get:
 *     summary: Retrieve a single agence.
 *     description: Retrieve a single agence.
 *     tags:
 *       - agence
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: agences fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get("/agence/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("agence")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "agence not found with the given id",
            status: 200,
            data: rows,
          });
        }

        res.json({
          message: "agence fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
