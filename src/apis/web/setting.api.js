const app = require("../../../index");
const createHttpError = require("http-errors");

/**
 * @swagger
 * components:
 *   schemas:
 *     setting:
 *       type: object
 *       properties:
 *         id:
 *          type: integer
 *          description: The setting ID, auto_increment
 *          example: 34

 *         provider:
 *          type: string
 *          description: The provider's id.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         nb_tentative:
 *          type: integer
 *          description: The nombre of tentative possible.
 *          example: 3
 *         nb_colis:
 *          type: integer
 *          description: The number of colis .
 *          example: 5000
 */

/**
 * @swagger
 * /addsetting:
 *   post:
 *     summary: Create new setting.
 *     tags:
 *       - setting
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              provider:          # <!--- form field name
 *                type: string
 *                required: true
 *              nb_colis:          # <!--- form field name
 *                type: integer
 *
 *              nb_tentative:          # <!--- form field name
 *                type: integer
 *                required: false 
 *              num_facture:
 *                type: integer
 *                description: The facture number .
 *                example: 3
 *              num_console:
 *                type: integer
 *                description: The console number .
 *                example: 3
                             
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
 *                     provider:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     nb_colis:
 *                       type: integer
 *                       description: The clis number.
 *                       example: 500
 *                     nb_tentative:
 *                       type: integer
 *                       description: The tentative number .
 *                       example: 3
 *                     num_facture:
 *                       type: integer
 *                       description: The facture number .
 *                       example: 3
 *                     num_console:
 *                       type: integer
 *                       description: The facture number .
 *                       example: 3
 
 
*/
app.post(
  "/addsetting",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      await app.db
        .table(`setting`)
        .insert(req.body)
        .then(() => {
          res.status(200).json({
            message: "New setting created",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(
        new createHttpError.BadRequest("Invalid values to create a setting.")
      );
    }
  }
);

/**
 * @swagger
 * /setting/{id}:
 *   get:
 *     summary: Retrieve a single setting.
 *     description: Retrieve a single setting.
 *     tags:
 *       - setting
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the provider to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: settings fetched with the given id
 *       400:
 *         description: agencs not found with the given id
 *
 */
app.get(
  "/setting/:id",
  /* [authJwt.verifyToken] */ async (req, res, next) => {
    try {
      const rows = await app.db
        .from("setting")
        .select("*")
        .where("provider", "=", req.params.id);

      if (rows.length === 0) {
        return res.json({
          message: "setting not found with the given provider",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "setting fetched with the given provider",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);
