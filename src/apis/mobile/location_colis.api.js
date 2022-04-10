const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *     location_colis:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The agence ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         colis:
 *          type: string
 *          description: The colis's id.
 *          example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *         longitude:
 *          type: integer
 *          description: The driver's longitude.
 *          example: 35.4
 *         latitude:
 *          type: integer
 *          description: The driver's latitude.
 *          example: 74.1
 
 */

/**
 * @swagger
 * /colis/location/add:
 *   post:
 *     summary: Create new location for driver.
 *     tags:
 *       - mobile_location_colis
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *
 *              longitude:          # <!--- form field name
 *                type: string
 *                required: false 
 *              latitude:          # <!--- form field name
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
 *                     latitude:
 *                       type: integer
 *                       description: The agence's name.
 *                       example: create pickup
*/
app.post("/colis/location/add", async (req, res, next) => {
  try {
    await app
      .db("location_colis")
      .insert({
        id: uuid.v1().toLocaleUpperCase(),
        colis: req.body.colis,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
      })
      .then(() => {
        res.status(201).json({
          message: "New location created",
          status: 201,
          data: req.body,
        });
      });
  } catch (error) {
    console.log(error);
    next(
      new createHttpError.BadRequest("Invalid values to create a location.")
    );
  }
});
