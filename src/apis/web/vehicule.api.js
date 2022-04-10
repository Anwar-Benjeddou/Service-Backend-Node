const app = require("../../../index");

const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     vehicule:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The permission ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         matricule:
 *          type: string
 *          description: The vehicule's code generated in backend.
 *          example: 6DFGD
 *         agence:
 *          type: string
 *          description: The vehicule's agence.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         capacity:
 *          type: string
 *          description: The vehicule's capacity.
 *          example: 1T
 *         modele:
 *          type: string
 *          description: The vehicule's modele.
 *          example: 1T
 *         status:
 *          type: string
 *          description: The vehicule's status 0||1. default value 0
 *          example: 0
 
 */

/**
 * @swagger
 * /addVehicule:
 *   post:
 *     summary: Create new vehicule.
 *     tags:
 *       - vehicule
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              agence:
 *                type: string
 *                required: true
 *              matricule:
 *                type: string
 *                required: true
 *              capacity:
 *                type: string
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
 *                     matricule:
 *                       type: string
 *                       description: The user matricule.
 *                       example: 273d06f83f
 *                     capacity:
 *                       type: string
 *                       description: The agence's capacity.
 *                       example: 1T
 *                     agence:
 *                       type: string
 *                       description: The agence's agence.
 *                       example: auigsi-34R34R4R
 */
app.post("/addVehicule", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const id = uuid.v1().toLocaleUpperCase();
    await app.db
      .table(`vehicule`)
      .insert({
        id: id,
        ...req.body,
      })
      .then(() => {
        res.status(201).json({
          message: "New vehicule created",
          status: 201,
          data: req.body,
        });
      });
  } catch (error) {
    console.log(error);
    next(
      new createHttpError.BadRequest("Invalid values to create a customer.")
    );
  }
});
/**
* @swagger
* /vehicule/{id}:
*   put:
*     summary: Update vehicule.
*     description: Updates a single vehicule.
*     tags:
*       - vehicule
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
 
*               agence:
*                 type: string
*                 description: The vehicule's agence.
*               capacity:
*                 type: string
*                 description: The vehicule's capacity.
*               matricule:
*                 type: string
*                 description: The vehicule's matricule.
*               modele:
*                 type: string
*                 description: The vehicule's modele.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: String ID of the vehicule to retrieve.
*         schema:
*           type: string
*     responses:
*       200:
*         description: Successfully updated
*       400 :
*         description: name shoud have minmum one item
*       500: 
*         description:  Invalid values to update a vehicule
*       
*/
app.put("/vehicule/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .table("vehicule")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "vehicule not found with the given id",
            status: 200,
            data: req.body,
          });
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
 * /vehicule:
 *   get:
 *     summary: Retrieve a list of vehicules
 *     description: Retrieve a list of vehicules .
 *     tags:
 *       - vehicule
 *     responses:
 *       200:
 *         description: A list of vehicules.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/vehicule'
 *       500:
 *         description : Internal server
 */

app.get("/vehicule", [authJwt.verifyToken], async (req, res, next) => {
  try {
    /*   const user_agence = req.agence; */
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const rows = (await app.db.from("vehicule").select("*"))
      /*  .where("agence", "=", user_agence) */
      .map((e) => ({ ...e, agence: agence[e.agence] }));
    if (rows.length === 0) {
      return res.json({
        message: "vehicule not found with the given id",
        status: 200,
        data: rows,
      });
    }
    res.json({
      message: "vehicule fetched",
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
 * /vehicule/{id}:
 *   get:
 *     summary: Retrieve a single vehicule.
 *     description: Retrieve a single vehicule.
 *     tags:
 *       - vehicule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: vehicules fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get("/vehicule/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const rows = (
      await app.db.from("vehicule").select("*").where("id", "=", req.params.id)
    ).map((e) => ({ ...e, agence: agence[e.agence] }));

    if (rows.length === 0) {
      return res.json({
        message: "vehicule not found with the given id",
        status: 200,
        data: rows,
      });
    }

    res.json({
      message: "vehicule fetched with the given id",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
