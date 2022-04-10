const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *     permission:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The permission ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         name:
 *          type: string
 *          description: The permission's name.
 *          example: create pickup
 */

/**
 * @swagger
 * /addPremission:
 *   post:
 *     summary: Create new permisson.
 *     tags:
 *       - permission
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *             name:          # <!--- form field name
 *               type: string
 *               required:
 *                - name
 *         application/xml:
 *           schema:
 *            type: object
 *            properties:
 *             name:          # <!--- form field name
 *               type: string
 *               required:
 *                - name
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *              name:          # <!--- form field name
 *                type: string
 *              required:
 *               - name
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
 *                       description: The permission's name.
 *                       example: create pickup
 */

app.post(
  "/addPremission",
  /* [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      await app.db
        .table("permission")
        .insert({ id: uuid.v1().toLocaleUpperCase(), ...req.body })
        .then(() => {
          res.status(201).json({
            message: "New permission created",
            status: 201,
            data: req.body,
          });
        });
    } catch (err) {
      next(
        new createHttpError.BadRequest("Invalid values to create a permission.")
      );
    }
  }
);

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Update permission.
 *     description: Updates a single permission.
 *     tags:
 *       - permission
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The permission's name.
 *                 example: create pickup
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the permission to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400 :
 *         description: name shoud be not empty
 *       500:
 *         description:  Invalid values to update a permission
 *
 */
app.put("/permissions/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const name = req.body.name;
    if (name) {
      await app.db
        .table("permission")
        .update({ ...req.body, updated_at: new Date() })
        .where("id", "=", req.params.id)
        .then(() => {
          res.status(200).json({
            message: "Successfully updated",
            status: 200,
            data: req.body,
          });
        });
    } else {
      next(
        new createHttpError.BadRequest("Invalid values to update a permission.")
      );
    }
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Retrieve a list of permissions
 *     description: Retrieve a list of permissions .
 *     tags:
 *       - permission
 *     responses:
 *       200:
 *         description: A list of permissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/permission'
 *       500:
 *         description : Internal server
 */

app.get("/permissions", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("permission")
      .select("*")
      .then((rows) => {
        res.json({
          message: "Permissions fetched",
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
 * /permissions/{id}:
 *   get:
 *     summary: Retrieve a single permission.
 *     description: Retrieve a single permission.
 *     tags:
 *       - permission
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: Permission fetched with the given id
 *       400:
 *         description: Permission not found with the given id
 *
 */
app.get("/permissions/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("permission")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return next(
            new createHttpError.NotFound(
              "Permission not found with the given id"
            )
          );
        }

        res.json({
          message: "Permission fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
