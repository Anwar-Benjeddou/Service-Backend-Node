const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * /ticket/add:
 *   post:
 *     summary: create new ticket.
 *     tags:
 *       - ticket
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *                     message:
 *                       type: string
 *                       description: The message of ticket.
 *                       example: 
 *                     colis:
 *                       type: string
 *                       description: The agence's city.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     type:
 *                       type: string
 *                       description: The message of ticket.
 *                     value:
 *                       type: object
 *                       description: list .
 * 
                          
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
 *                     message:
 *                       type: array
 *                       description: The message of ticket.
 *                       example: 
 *                     colis:
 *                       type: string
 *                       description: The agence's city.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     type:
 *                       type: string
 *                       description: The message of ticket.
 */
app.post("/ticket/add", [authJwt.verifyToken], async (req, res, next) => {
  try {
    await app.db.transaction(async (trx) => {
      const id = uuid.v1().toLocaleUpperCase();
      await trx.table(`ticket`).insert({
        id: id,
        type: req.body.type,
        colis: req.body.colis,
        code: "TICK-" + Math.floor(1000 + Math.random() * 9000),
        message: req.body.message,
        priority: req.body.priority,
        value: req.body.value,
      });
      await trx.table("colis_history").insert({
        id: uuid.v1().toLocaleUpperCase(),
        action: id,
        colis: req.body.colis,
        actionneurs: req.userId,
        agence:req.agence,
        event: "créer ticket",
      });
      if (req.body.type === "Change Prix") {
        res.status(200).json({
          message: "ticket created",
          status: 200,
          data: req.body,
        });
      } else {
        await trx
          .table("colis")
          .update({ ...req.body.value, updated_at: new Date() })
          .where("id", "=", req.body.colis);
        res.status(200).json({
          message: "ticket created",
          status: 200,
          data: req.body,
        });
      }
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError());
  }
});

/**
* @swagger
* /ticket/valid/{id}:
*   put:
*     summary: Update status ticket and update colis price.
*     description: Updates a status of ticket.
*     tags:
*       - ticket

*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: String ID of the ticket to retrieve.
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
app.put(
  "/ticket/valid/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      await app.db.transaction(async (trx) => {
        await trx
          .table("ticket")
          .update({ status: 1, updated_at: new Date() })
          .where("id", "=", req.params.id);
        const [tickets] = await trx
          .table("ticket")
          .where("id", "=", req.params.id);

        await trx
          .table("colis")
          .update({
            ...JSON.parse(tickets.value),
            updated_at: new Date(),
          })
          .where("id", "=", tickets.colis)
          .then((rows) => {
            if (rows.length === 0) {
              return res.json({
                message: "colis not found with the given id",
                status: 200,
                data: tickets,
              });
            }
            res.status(200).json({
              message: "ticket valid",
              status: 200,
              data: tickets,
            });
          });
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
* @swagger
* /ticket/close/{id}:
*   put:
*     summary: Update status ticket (open/colse).
*     description: Updates a status of ticket.
*     tags:
*       - ticket

*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: String ID of the ticket to retrieve.
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
app.put(
  "/ticket/close/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const rows = await app.db
        .from("ticket")
        .update({ status: 1, updated_at: new Date() })
        .where("id", "=", req.params.id);

      return res.json({
        message: "ticket closed",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * /ticket/info/{id}:
 *   get:
 *     summary: Retrieve a ticket.
 *     description: Retrieve a ticket of colis.
 *     tags:
 *       - ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the colis to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: tickets fetched with the given id
 *       400:
 *         description: tickets not found with the given id
 *
 */
app.get(
  "/ticket/info/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const rows = await app.db
        .from("ticket")
        .select("*")
        .where("colis", "=", req.params.id);

      if (rows.length === 0) {
        return res.json({
          message: "ticket not found with the given id",
          status: 200,
          data: rows,
        });
      }

      res.json({
        message: "ticket fetched with the given id",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  }
);

/**
 * @swagger
 * /ticket/list:
 *   get:
 *     summary: List of all ticket
 *     description: list ticket
 *     tags:
 *       - ticket
 
 *     parameters:

 *         - in: query
 *           name: current_page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: per_page
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *         - in: query
 *           name: order_by_column
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *     responses:
 *       200:
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
app.get("/ticket/list", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence_user = req.agence;
    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    let reqData = req.query;
    let pagination = {};
    let per_page = reqData.per_page || 10;
    let page = reqData.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    const id_colis = await app
      .db("colis")
      .select("id")
      .where("agence", "=", agence_user);
    const info_colis = (
      await app.db("colis").select("*").where("agence", "=", agence_user)
    ).reduce(
      (a, e) => ({
        ...a,
        [e.id]: e,
      }),
      {}
    );

    const total = await app.db
      .from("ticket")
      .count("* as count")
      .where(
        "colis",
        "IN",
        id_colis.map((colis) => colis.id)
      )
      .first();
    const pickups = (
      await app.db
        .table("ticket")
        .select("*")
        .where(
          "colis",
          "IN",
          id_colis.map((colis) => colis.id)
        )

        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
    ).map((e) => ({ ...e, colis: info_colis[e.colis] }));

    var count = total.count;
    var rows = pickups;
    pagination.total = count;
    pagination.per_page = per_page;
    pagination.offset = offset;
    pagination.to = offset + rows.length;
    pagination.last_page = Math.ceil(count / per_page);
    pagination.current_page = page;
    pagination.from = offset;
    pagination.data = rows;
    if (pickups.length === 0) {
      return res.json({
        message: "ticket not found  ",
        status: 200,
        data: pagination,
      });
    }
    res.json({
      message: "ticket fetched",
      status: 200,
      data: pagination,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});


/**
 * @swagger
 * /requirepayment/add:
 *   post:
 *     summary: create new requirepayment.
 *     tags:
 *       - requirepayment
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *                     message:
 *                       type: string
 *                       description: The message of ticket.
 *                       example: 
 *                     colis:
 *                       type: string
 *                       description: The agence's city.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     type:
 *                       type: string
 *                       description: The message of ticket.
 *                     value:
 *                       type: object
 *                       description: list .
 * 
                          
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
 *                     message:
 *                       type: array
 *                       description: The message of ticket.
 *                       example: 
 *                     colis:
 *                       type: string
 *                       description: The agence's city.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     type:
 *                       type: string
 *                       description: The message of ticket.
 */
 app.post("/requirepayment/add", [authJwt.verifyToken], async (req, res, next) => {
  console.log('requirepayment')
  try {
    await app.db.transaction(async (trx) => {
      const id = uuid.v1().toLocaleUpperCase();
      await trx.table(`require_payment`).insert({
        id: id,
        provider:req.userId,
        created_at:new Date()
      });
        res.status(200).json({
          message: "ticket created",
          status: 200,
          data: req.body,
        });
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError());
  }
});


/**
 * @swagger
 * /requirepayment/list:
 *   get:
 *     summary: List of all ticket
 *     description: list ticket
 *     tags:
 *       - ticket
 
 *     parameters:

 *         - in: query
 *           name: current_page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: per_page
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *         - in: query
 *           name: order_by_column
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *     responses:
 *       200:
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
 app.get("/requirepayment/list", async (req, res, next) => {
  try {
    const provider = (
      await app.db.table("provider as p").join("app_user as u ", "u.id", "p.id")
    ).reduce(
      (a, e) => ({
        ...a,
        [e.id]: e,
      }),
      {}
    );
    const list = (await app.db.table("require_payment").where("process", "=", 0))
    .map((e) => ({ ...e, provider: provider[e.provider] }))
   
    
   
    res.json({
      message: "ticket fetched",
      status: 200,
      data: list,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
/**
 * @swagger
 * /requirepayment/list:
 *   put:
 *     summary: List of all ticket
 *     description: list ticket
 *     tags:
 *       - ticket
 
 *     parameters:

 *         - in: query
 *           name: current_page
 *           schema:
 *             type: integer
 *           description: The number of items to skip before starting to collect the result set
 *         - in: query
 *           name: per_page
 *           schema:
 *             type: integer
 *           description: The numbers of items to return
 *         - in: query
 *           name: order_by_column
 *           schema:
 *             type: string
 *           description: The deafault columns is created_at
 *         - in: query
 *           name: order_by_direction
 *           schema:
 *             type: string
 *           description: The default value desc
 *     responses:
 *       200:
 *         decription: pickups fetched.
 *       400:
 *         description: pickups not found.
 *
 */
 app.put("/requirepayment/valider/:id", async (req, res, next) => {
  try {
    const rows = await app.db
        .from("require_payment")
        .update({ process: 1, updated_at: new Date() })
        .where("id", "=", req.params.id);

   
    res.json({
      message: "ticket fetched",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
