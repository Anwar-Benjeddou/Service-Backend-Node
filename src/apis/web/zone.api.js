const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     zone:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The permission ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f

 *         agence:
 *          type: string
 *          description: The zone's agence.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         address:
 *          type: string
 *          description: The zone's address.
 *          example: TUNIS,lac
 *         city:
 *          type: string
 *          description: The v's name.
 *          example: lac
 */

/**
 * @swagger
 * /addZone:
 *   post:
 *     summary: Create new zone.
 *     tags:
 *       - zone
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              agence:          # <!--- form field name
 *                type: string
 *                required: true
 *              address:          # <!--- form field name
 *                type: string
 *                required: true
 *
 *              city:          # <!--- form field name
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
 *                     address:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     city:
 *                       type: string
 *                       description: The agence's city.
 *                       example: create pickup
 *                     code:
 *                       type: string
 *                       description: The agence's code.
 *                       example: create pickup
 *                     agence:
 *                       type: string
 *                       description: The agence's agence.
 *                       example: create pickup
*/
app.post("/addZone", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const id = uuid.v1().toLocaleUpperCase();
    await app.db
      .table(`zone`)
      .insert({
        id: id,
        ...req.body,
        name: "ZONE_" + req.body.city,
      })
      .then(() => {
        res.status(200).json({
          message: "New zone created",
          status: 200,
          data: req.body,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Invalid values to create a zone."));
  }
});
/**
* @swagger
* /zone/{id}:
*   put:
*     summary: Update zone.
*     description: Updates a single zone.
*     tags:
*       - zone
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
 
*               agence:
*                 type: string
*                 description: The zone's agence.
*               address:
*                 type: string
*                 description: The zone's address.
*               city:
*                 type: string
*                 description: The zone's city.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: String ID of the zone to retrieve.
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
app.put("/zone/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .table("zone")
      .update({ ...req.body, updated_at: new Date() })
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return res.json({
            message: "zone not found with the given id",
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
 * /zone:
 *   get:
 *     summary: Retrieve a list of zones
 *     description: Retrieve a list of zones .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: A list of zones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/zone'
 *       500:
 *         description : Internal server
 */

app.get("/zone", [authJwt.verifyToken], async (req, res, next) => {
  try {
    /* const user_agence = req.agence; */
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const rows = (await app.db.from("zone").select("*")).map((e) => ({
      ...e,
      agence: agence[e.agence],
    }));
    if (rows.length === 0) {
      return res.json({
        message: "zone not found with the given id",
        status: 200,
        data: rows,
      });
    }
    res.json({
      message: "zone fetched",
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
 * /zone/{id}:
 *   get:
 *     summary: Retrieve a single zone.
 *     description: Retrieve a single zone.
 *     tags:
 *       - zone
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
app.get("/zone/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const rows = (
      await app.db.from("zone").select("*").where("id", "=", req.params.id)
    ).map((e) => ({ ...e, agence: agence[e.agence] }));

    if (rows.length === 0) {
      return res.json({
        message: "zone not found with the given id",
        status: 200,
        data: rows,
      });
    }

    res.json({
      message: "zone fetched with the given id",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
