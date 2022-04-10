const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     privilege:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The privilege ID.
 *           example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         name:
 *             type: string
 *             description: the name privilege
 *             example: ADMIN
 *         description:
 *                    type: string discrption privilege
 *                    description:
 *                    example: ADMIN agence
 */

/**
 * @swagger
 * /addPrivilege:
 *   post:
 *     summary: Create new perivilege.
 *     tags:
 *       - privilege
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
 *             description:
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
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f *
 *                     name:
 *                       type: string
 *                       description: The privilege's name.
 *                       example: create pickup
 */

app.post(
  "/addPrivilege",
  /* [authJwt.verifyToken],  */ async (req, res, next) => {
    try {
      await app.db
        .table("privilege")
        .insert({ id: uuid.v1().toLocaleUpperCase(), ...req.body })
        .then(() => {
          res.status(201).json({
            message: "New perivilege created",
            status: 201,
            data: req.body,
          });
        });
    } catch (err) {
      console.log(err);
      next(
        new createHttpError.BadRequest("Invalid values to create a perivilege.")
      );
    }
  }
);

/**
 * @swagger
 * /privilege/{id}:
 *   put:
 *     summary: Update perivilege.
 *     description: Updates a single privilege.
 *     tags:
 *       - privilege
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The privilege's name.
 *                 example: admin
 *               description:
 *                 type: string
 *                 description: The privilege's description.
 *                 example: admin agence
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the privilege to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400 :
 *         description: name shoud be not empty
 *       500:
 *         description:  Invalid values to update a privilege
 *
 */
app.put("/privilege/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    if (name || description) {
      await app.db
        .table("privilege")
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
        new createHttpError.BadRequest("Invalid values to update a privilege.")
      );
    }
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /privileges:
 *   get:
 *     summary: Retrieve a list of privileges
 *     description: Retrieve a list of privileges.
 *     tags:
 *       - privilege
 *     responses:
 *       200:
 *         description: A list of privileges.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/privilege'
 *       500:
 *         description : Internal server
 */

app.get("/privileges", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("privilege")
      .select("*")
      .then((rows) => {
        res.json({
          message: "privileges fetched",
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
 * /privilege/{id}:
 *   get:
 *     summary: Retrieve a single privilege.
 *     description: Retrieve a single privilege.
 *     tags:
 *       - privilege
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: privileges fetched with the given id
 *       400:
 *         description: privilege not found with the given id
 *
 */
app.get("/privilege/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("privilege")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return next(
            new createHttpError.NotFound(
              "privilege not found with the given id"
            )
          );
        }

        res.json({
          message: "privilege fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
