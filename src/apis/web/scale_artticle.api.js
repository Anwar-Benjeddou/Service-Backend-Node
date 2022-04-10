const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     article:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The provider's id.
 *          example: AZRDQ44
 *         code:
 *          type: string
 *          description: The provider's code.
 *          example: AZRDQ44
 *         article:
 *          type: string
 *          description: The provider's article.
 *          example: 3434
 */

/**
 * @swagger
 * /addArticle:
 *   post:
 *     summary: Create new article.
 *     description: name peut entre cod || rtrn || onp || fix || rtn
 *     tags:
 *       - article
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
 *             article:          # <!--- form field article
 *               type: string
 
 *         application/xml:
 *           schema:
 *            type: object
 *            properties:
 *             article:          # <!--- form field article
 *               type: string
 *               required:
 *                - article
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *              article:          # <!--- form field article
 *                type: string
 *              required:
 *               - article
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
 *                     article:
 *                       type: string
 *                       description: The article's article.
 *                       example: create pickup
 */

app.post("/addArticle", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .table("article")
      .insert({
        id: uuid.v1().toLocaleUpperCase(),
        article: req.body.article.toUpperCase(),
        code: "ART_" + req.body.article.toUpperCase(),
      })
      .then(() => {
        res.status(201).json({
          message: "New article created",
          status: 201,
          data: req.body,
        });
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a article."));
  }
});

/**
 * @swagger
 * /article/{id}:
 *   put:
 *     summary: Update article.
 *     description: Updates a single article.
 *     tags:
 *       - article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               article:
 *                 type: string
 *                 description: The article's article.
 *                 example: admin
 *               code:
 *                 type: string
 *                 description: The article's code.
 *                 example: COD_RTN
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the article to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400 :
 *         description: article shoud be not empty
 *       500:
 *         description:  Invalid values to update a article
 *
 */
app.put("/article/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    if (req.body) {
      await app.db
        .table("article")
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
        new createHttpError.BadRequest("Invalid values to update a article.")
      );
    }
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Retrieve a list of articles
 *     description: Retrieve a list of articles.
 *     tags:
 *       - article
 *     responses:
 *       200:
 *         description: A list of articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/article'
 *       500:
 *         description : Internal server
 */

app.get("/articles", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("article")
      .select("*")
      .then((rows) => {
        res.json({
          message: "articles fetched",
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
 * /article/{id}:
 *   get:
 *     summary: Retrieve a single article.
 *     description: Retrieve a single article.
 *     tags:
 *       - article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: articles fetched with the given id
 *       400:
 *         description: article not found with the given id
 *
 */
app.get("/article/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db
      .from("article")
      .select("*")
      .where("id", "=", req.params.id)
      .then((rows) => {
        if (rows.length === 0) {
          return next(
            new createHttpError.NotFound("article not found with the given id")
          );
        }

        res.json({
          message: "article fetched with the given id",
          status: 200,
          data: rows,
        });
      });
  } catch (error) {
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
