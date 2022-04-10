const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");
/**
 * @swagger
 * /spending/magasin:
 *   get:
 *     summary: Retrieve a list of articles
 *     description: Retrieve a list of articles.
 *     tags:
 *       - article_magasin
 *     responses:
 *       200:
 *         description: A list of articles magasin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/article'
 *       500:
 *         description : Internal server
 */

app.get("/spending/magasin", [authJwt.verifyToken], async (req, res, next) => {
    try {
        const article_magasinA = (await app.db
            .table("article_magasin")).reduce((a, e) => ({ ...a, [e.id]: e }), {});
        await app.db
            .from("spending")
            .select("*")
            .where("user", "=", req.userId)
            .where("status", "!=", 2)
            .then((rows) => {
                res.json({
                    message: "spending fetched",
                    status: 200,
                    data: rows.map((e) => ({ ...e, article_magasin: article_magasinA[e.article_magasin] }))
                });
            });
    } catch (error) {
        next(new createHttpError.InternalServerError("Internal Server Error"));
    }
});
/**
 * @swagger
 * /spending/magasin:
 *   get:
 *     summary: Retrieve a list of articles
 *     description: Retrieve a list of articles.
 *     tags:
 *       - article_magasin
 *     responses:
 *       200:
 *         description: A list of articles magasin.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/article'
 *       500:
 *         description : Internal server
 */

app.get("/spending/magasin/per_user/:id", [authJwt.verifyToken], async (req, res, next) => {
    try {
        const article_magasinA = (await app.db
            .table("article_magasin")).reduce((a, e) => ({ ...a, [e.id]: e }), {});
        await app.db
            .from("spending")
            .select("*")
            .where("user", "=", req.params.id)
            .where("status", "!=", 2)
            .then((rows) => {
                res.json({
                    message: "spending fetched",
                    status: 200,
                    data: rows.map((e) => ({ ...e, article_magasin: article_magasinA[e.article_magasin] }))
                });
            });
    } catch (error) {
        next(new createHttpError.InternalServerError("Internal Server Error"));
    }
});


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

app.post("/add/spending/magasin", [authJwt.verifyToken], async (req, res, next) => {
    try {
        await app.db
            .table("spending")
            .insert({
                id: uuid.v1().toLocaleUpperCase(),
                user: req.userId,
                value: req.body.value,
                article_magasin: req.body.article_magasin,
                outlay: req.body.outlay,
                outlay_for: req.body.outlay_for,
                status: req.body.status
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

app.put("/spendings/validate", [authJwt.verifyToken], async (req, res, next) => {
    try {
        const user = req.userId;

        app.db
            .transaction(async (trx) => {
                const { spendings } = req.body;

                //.andWhere("check_magasinier", "=",1)
                for (const elmdelivery of spendings) {
                    await trx
                        .table("spending")
                        .update({ status: 2, updated_at: new Date() })
                        .where("id", "=", elmdelivery);




                }
            })
            .then(() => {
                res.status(201).json({
                    message: "Successfully updated colis",
                    status: 200,
                    data: req.body,
                });
            })
            .catch((err) => {
                console.error(err);
                next(
                    new createHttpError.InternalServerError("Internal server error")
                );
            });
    } catch (error) {
        console.log(error);
    }
}
);