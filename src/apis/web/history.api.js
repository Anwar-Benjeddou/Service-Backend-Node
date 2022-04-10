const app = require("../../../index");
const createHttpError = require("http-errors");

/**
 * @swagger
 * components:
 *   schemas:
 *     colis_history:
 *       type: object
 *       properties:
 *         id:
 *          type: string
 *          description: The permission ID.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         colis:
 *          type: string
 *          description: The colis's id.
 *          example: 6DFGD
 *         action:
 *          type: string
 *          description: The action can be pickup/delivery....
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         actionneurs:
 *          type: string
 *          description: The user how do the action.
 *          example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *         created_at:
 *          type: date
 *          description: The date of the action.
 *          example: 0
 *         updated_at:
 *          type: date
 *          description: if we have updated in table history
 *          example: 0
 
 */
/**
 * @swagger
 * /colis/history/{id}:
 *   get:
 *     summary: Retrieve  history of colis.
 *     description: Retrieve a  history of colis.
 *     tags:
 *       - history
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the colis to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: history fetched with the given id
 *       400:
 *         description: history not found with the given id
 *
 */
app.get("/colis/history/:id", async (req, res, next) => {
  try {
    const driver = (
      await app.db
        .table("driver " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

    const user = (await app.db.table("app_user ")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const agence = (await app.db.table("agence ")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const provider = (
      await app.db
        .table("provider " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const coliss = (await app.db.table("colis").where("id", "=",req.params.id))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});

    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    const history = (
      await app.db
        .table("colis_history")
        .orderBy(orderByColumn, orderByDirection)
        .where("colis", "=", req.params.id)
    ).map((e) => ({
      ...e,
      actionneurs:
        driver[e.actionneurs] || user[e.actionneurs] || provider[e.actionneurs],
      colis: coliss[e.colis],
      agence:agence[e.agence]
    }));
    console.log(history);

    if (history.length === 0) {
      return res.json({
        message: "history not found  ",
        status: 200,
        data: history,
      });
    }

    res.json({
      message: "driver fetched",
      status: 200,
      data: history,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /driver/history/{id}:
 *   get:
 *     summary: Retrieve  history of driver action.
 *     description: Retrieve a  history of driver action.
 *     tags:
 *       - history
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the colis to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: history fetched with the given id
 *       400:
 *         description: history not found with the given id
 *
 */
app.get("/driver/history/:id", async (req, res, next) => {
  try {
    const driver = (
      await app.db
        .table("driver " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const agence = (await app.db.table("agence ")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );


    const provider = (
      await app.db
        .table("provider " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const coliss = (await app.db.table("colis").select("id", "provider"))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});

    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    const history = (
      await app.db
        .table("colis_history")
        .orderBy(orderByColumn, orderByDirection)
        .where("actionneurs", "=", req.params.id)
    ).map((e) => ({
      ...e,
      actionneurs: driver[e.actionneurs],
      colis: coliss[e.colis],
      agence:agence[e.agence]
    }));
    if (history.length === 0) {
      return res.json({
        message: "history not found  ",
        status: 200,
        data: history,
      });
    }

    res.json({
      message: "history fetched",
      status: 200,
      data: history,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /history/colis/{id}:
 *   get:
 *     summary: Retrieve  last action of colis.
 *     description: Retrieve  last action of colis.
 *     tags:
 *       - history
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the colis to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: history fetched with the given id
 *       400:
 *         description: history not found with the given id
 *
 */
app.get("/history/colis/:id", async (req, res, next) => {
  try {
    const driver = (
      await app.db
        .table("driver " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

    const user = (await app.db.table("app_user ")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const provider = (
      await app.db
        .table("provider " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const coliss = (await app.db.table("colis").select("id", "provider"))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const agence = (await app.db.table("agence ")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    const history = (
      await app.db
        .table("colis_history")
        .orderBy(orderByColumn, orderByDirection)
        .where("colis", "=", req.params.id)
    ).map((e) => ({
      ...e,
      actionneurs:
        driver[e.actionneurs] || user[e.actionneurs] || provider[e.actionneurs],
      colis: coliss[e.colis],
      agence: agence[e.agence]
    }));

    if (history.length === 0) {
      return res.json({
        message: "history not found  ",
        status: 200,
        data: history,
      });
    }

    res.json({
      message: "history fetched",
      status: 200,
      data: history[0],
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
