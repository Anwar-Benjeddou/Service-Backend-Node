const app = require("../../../index");
const uuid = require("uuid");
const validateCustomer = require("../../middlewares/valiate-user");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 
 *     driver:
 *       type: object
 *       properties:
 
 *         zone:
 *          type: string
 *          description: The driver's username.
 *          example: zone 2 
 *         vehicule:
 *          type: string
 *          description: The driver's vehicule.
 *          example:  03de03c4-64fd-40e8-ba8c-b7273d06f83f
 
 */

/**
 * @swagger
 * /addDriver:
 *   post:
 *     summary: Create new driver.
 *     description:
 *     tags:
 *       - driver
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/driver'
 *             properties:
 *               privilege:
 *                 type: string
 *                 description: The privilege's ID.
 *                 example: admin
 *               permissions:
 *                 type: array
 *                 description: The permission's ID.
 *                 example: ['03de03c4-64fd-40e8-ba8c-b7273d06f83f']
 *
 *
 *         application/xml:
 *           schema:
 *            allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/driver'
 *         application/x-www-form-urlencoded:
 *           schema:
 *           allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/driver'
 *         text/plain:
 *           schema:
 *            type: string
 *
 *
 *     responses:
 *       201:
 *         description: New user created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:          # <!--- form field username
 *                             type: string
 *                     lastname:          # <!--- form field lastname
 *                             type: string
 *                     firstname:          # <!--- form field firstname
 *                              type: string
 *                     phone_number:          # <!--- form field phone_number
 *                                type: string
 *                     address:          # <!--- form field address
 *                            type: string
 *                     password:          # <!--- form field password
 *                             type: string
 *                     descriminator:          # <!--- form field descriminator
 *                                  type: string
 *                     email:          # <!--- form field email
 *                          type: string
 *                     zone:          # <!--- form field email
 *                          type: string
 *                     vehicule:          # <!--- form field email
 *                          type: string
 *                     agence:          # <!--- form field email
 *                          type: string
 */
app.post(
  "/addDriver",
  validateCustomer,
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db.transaction(async (trx) => {
        const id = uuid.v1().toLocaleUpperCase();
        await trx.table("app_user").insert({
          id: id,
          username: req.body.username,
          lastname: req.body.lastname,
          firstname: req.body.firstname,
          phone_number: req.body.phone_number,
          address: req.body.address,
          email: req.body.email,
          agence: req.body.agence,
          password: req.body.password,
          descriminator: req.body.descriminator.toLocaleUpperCase(),
        });

        await trx.table("driver").insert({
          id: id,

          zone: req.body.zone,
          vehicule: req.body.vehicule,
        });

        if (req.body.vehicule) {
          await trx
            .table("vehicule")
            .update({ status: 1 })
            .where("id", "=", req.body.vehicule);
        }

        req.body.permissions.map(async (permission) => {
          await trx.table("user_permission").insert({
            users: id,
            permissions: permission,
          });
        });

        await trx
          .table("user_privilege")
          .insert({
            users: id,
            privileges: req.body.privilege,
          })
          .then(() => {
            res.status(201).json({
              message: "New driver created",
              status: 201,
              data: req.body,
            });
          });
      });
    } catch (err) {
      next(
        new createHttpError.BadRequest("Invalid values to create a driver.")
      );
    }
  }
);

/**
 * @swagger
 * /driver:
 *   get:
 *     summary: Retrieve a single driver.
 *     description: Retrieve a single driver.
 *     tags:
 *       - driver
 *
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/driver'
 *       500:
 *         description : Internal server
 */

app.get("/driver", [authJwt.verifyToken], async (req, res, next) => {
  try {
    // const user_agence = req.agence;
    const zones = (await app.db.table("zone")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const vehicule = (await app.db.table("vehicule")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const rows = (
      await app.db
        .from("driver " + " as p")
        .select("*")
        .join("app_user as u ", "u.id", "p.id")
    )
      /*  .where("agence", "=", user_agence) */
      .map((e) => ({
        ...e,
        agence: agence[e.agence],
        vehicule: vehicule[e.vehicule],
        zone: zones[e.zone],
      }));
    if (rows.length === 0) {
      return res.json({
        message: "User not found  ",
        status: 200,
        data: rows,
      });
    }

    res.json({
      message: "driver fetched",
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
 * /driver/{id}:
 *   put:
 *     summary: update  driver.  
 *     description: driver
 *     tags:
 *       - driver 
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/driver'
 *             properties:
 *               privilege:
 *                 type: string
 *                 description: The privilege's ID.
 *                 example: admin 
 *               permissions:
 *                 type: array
 *                 description: The permission's ID.
 *                 example: ['03de03c4-64fd-40e8-ba8c-b7273d06f83f'] 
 * 
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID user.
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: user updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:          # <!--- form field username
 *                             type: string
 *                     lastname:          # <!--- form field lastname
 *                             type: string
 *                     firstname:          # <!--- form field firstname
 *                              type: string
 *                     phone_number:          # <!--- form field phone_number
 *                                type: string
 *                     address:          # <!--- form field address
 *                            type: string
 *                     password:          # <!--- form field password
 *                             type: string
 *                     descriminator:          # <!--- form field descriminator
 *                                  type: string
 *                     email:          # <!--- form field email
 *                          type: string
 *                     zone:          # <!--- form field email
 *                          type: string
 *                     vehicule:          # <!--- form field email
 *                          type: string
 *                     agence:          # <!--- form field username
 *                             type: string
 
*/
app.put(
  "/driver/:id",
  [authJwt.verifyToken],

  async (req, res, next) => {
    try {
      console.log(req.body, req.params);
      app.db.transaction(async (trx) => {
        const {
          username,
          lastname,
          phone_number,
          address,
          email,
          firstname,
          password,
          descriminator,
          privilege,
          permissions,
          vehicule,
          zone,
          agence,
        } = req.body;

        if (
          username ||
          lastname ||
          phone_number ||
          address ||
          email ||
          firstname ||
          password ||
          descriminator
        ) {
          await trx
            .table("app_user")
            .update({
              username: username,
              lastname: lastname,
              firstname: firstname,
              phone_number: phone_number,
              address: address,
              email: email,
              agence: agence,
              password: password,
              descriminator: descriminator,
              updated_at: new Date(),
            })
            .where("id", "=", req.params.id);
        }

        if (zone || vehicule) {
          await trx
            .table("driver")
            .update({
              updated_at: new Date(),
              zone: zone,
              vehicule: vehicule,
            })
            .where("id", "=", req.params.id);
        }
        if (permissions) {
          permissions.map(async (permission) => {
            await trx
              .table("user_permission")
              .update({
                updated_at: new Date(),
                permissions: permission,
              })
              .where("users", "=", req.params.id);
          });
        }

        if (privilege) {
          await trx
            .table("user_privilege")
            .update({
              privileges: privilege,
              updated_at: new Date(),
            })
            .where("users", "=", req.params.id);
        }
      });
      res.status(200).json({
        message: " user updated",
        status: 200,
        data: req.body,
      });
    } catch (err) {
      next(
        new createHttpError.BadRequest("Invalid values to create a customer.")
      );
    }
  }
);

/**
 * @swagger
 * /driver/{id}:
 *   get:
 *     summary: Retrieve a single driver.
 *     description: Retrieve a single driver.
 *     tags:
 *       - driver
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: driver fetched with the given id
 *       400:
 *         description: driver not found with the given id
 *
 */
app.get("/driver/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const zones = (await app.db.table("zone")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const vehicule = (await app.db.table("vehicule")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const rows = (
      await app.db
        .from("driver " + " as p")
        .select("*")
        .where("p.id", "=", req.params.id)
        .join("app_user as u ", "u.id", "p.id")
    ).map((e) => ({
      ...e,
      agence: agence[e.agence],
      vehicule: vehicule[e.vehicule],
      zone: zones[e.zone],
    }));
    if (rows.length === 0) {
      return res.json({
        message: "User not found with this ID ",
        status: 200,
        data: rows,
      });
    }

    res.json({
      message: "driver fetched",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});
