const app = require("../../../index");
const uuid = require("uuid");
//const validateCustomer = require("../../middlewares/valiate-user");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     app_user:
 *       type: object
 *       properties:
 *         
 *         username:
 *          type: string
 *          description: The user's username.
 *          example: oumaima 
 *         lastname:
 *          type: string
 *          description: The user's username.
 *          example: oumaima
 *         firstname:
 *          type: string
 *          description: The user's firstname.
 *          example: oumaima
 *         phone_number:
 *          type: string
 *          description: The user's  phone number,
 *          example: 50998877
 *         address:
 *          type: string
 *          description: The user's address.
 *          example: TUNIS, marsa
 *         password:
 *          type: string
 *          description: The user's password.
 *          example: ayrgxç09Jc
 *         descriminator:
 *          type: string
 *          description: The user's descriminator.
 *          example: "provider||  regualr_user ||  internal/ external driver ||  magasinier"
 *         email:
 *          type: string
 *          description: The user's email.
 *          example: email@gmail.com
 *         agence:
 *          type: string
 *          description: The user's agence.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 * 
 
 
 */

/**
 * @swagger
 * /addUser/{user}:
 *   post:
 *     summary: Create new user.  (magasinier ||admin)
 *     description: user can be "magasinier",or "admin of agence"
 *     tags:
 *       - users
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
 *         application/x-www-form-urlencoded:
 *           schema:
 *           allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *         text/plain:
 *           schema:
 *            type: string
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: String User type of user.
 *         schema:
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
 
*/
app.post(
  "/addUser/:user",
  /* validateCustomer, */
  /* [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const id = uuid.v1().toLocaleUpperCase();
          await trx.table("app_user").insert({
            id: id,
            username: req.body.username,
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            phone_number: req.body.phone_number || req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            agence: req.body.agence,
            password: req.body.password,
            descriminator: req.body.descriminator.toLocaleUpperCase(),
          });

          req.body.permissions.map(async (permission) => {
            await trx.table("user_permission").insert({
              users: id,
              permissions: permission,
            });
          });

          await trx.table("user_privilege").insert({
            users: id,
            privileges: req.body.privilege,
          });
        })
        .then(() => {
          res.status(201).json({
            message: "Successfully created user",
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
    } catch (err) {
      next(
        new createHttpError.BadRequest("Invalid values to create a customer.")
      );
    }
  }
);

/**
 * @swagger
 * /users/{user}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
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
 *       500:
 *         description : Internal server
 */

app.get(
  "/users/:user",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      if (req.params.user === "magasinier") {
        const rows = (
          await app.db
            .from("app_user as u")
            .select("*")
            .where("descriminator", "=", "MAGASINIER")
        ).map((e) => ({
          ...e,
          agence: agence[e.agence],
        }));
        if (rows.length === 0) {
          return res.json({
            message: "User not found  ",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "user fetched",
          status: 200,
          data: rows,
        });
      } else {
        const rows = (
          await app.db
            .from("app_user as u")
            .select("*")
            .where("descriminator", "=", "REGULAR_USER")
        ).map((e) => ({
          ...e,
          agence: agence[e.agence],
        }));
        if (rows.length === 0) {
          return res.json({
            message: "User not found  ",
            status: 200,
            data: rows,
          });
        }
        res.json({
          message: "user fetched",
          status: 200,
          data: rows,
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: update  provider.  
 *     description: Id of user.
 *     tags:
 *       - users 
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
 *
 *                     comapny:          # <!--- form field email
 *                          type: string
 *                     codePostal:          # <!--- form field email
 *                          type: string
 *                     codeFiscal:          # <!--- form field email
 *                          type: string
*/
app.put("/user/:id", [authJwt.verifyToken], async (req, res, next) => {
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
        agence
      } = req.body;
      if (
        username ||
        lastname ||
        phone_number ||
        address ||
        email ||
        firstname ||
        password ||
        descriminator ||
        agence
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
            password: password,
            descriminator: descriminator,
            agence: agence,
          })
          .where("id", "=", req.params.id);
      }
      if (permissions) {
        permissions.map(async (permission) => {
          await trx
            .table("user_permission")
            .update({
              permissions: permission,
            })
            .where("users", "=", req.params.id);
        });
      }

      if (privilege) {
        await trx
          .table("user_privilege")
          .update({
            privilege: privilege,
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
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user.
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: users fetched with the given id
 *       400:
 *         description: users not found with the given id
 *
 */
app.get("/user/:id", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const agence = (await app.db.table("agence")).reduce(
      (a, e) => ({ ...a, [e.id]: e }),
      {}
    );

    const rows = (
      await app.db
        .from("app_user as u")
        .select("*")
        .where("id", "=", req.params.id)
    ).map((e) => ({
      ...e,
      agence: agence[e.agence],
    }));
    if (rows.length === 0) {
      return res.json({
        message: "User not found with this id ",
        status: 200,
        data: rows,
      });
    }
    res.json({
      message: "user fetched",
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.BadRequest("Bad Request"));
  }
});

/**
 * @swagger
 * /user/desactive/{id}:
 *   put:
 *     summary: update  provider.  
 *     description: Id of user.
 *     tags:
 *       - users 
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
 *
 *                     comapny:          # <!--- form field email
 *                          type: string
 *                     codePostal:          # <!--- form field email
 *                          type: string
 *                     codeFiscal:          # <!--- form field email
 *                          type: string
*/
app.put("/desactive/user/:id",  async (req, res, next) => {
  console.log(req.params)
  try {
  console.log(req.params)
    app.db
      .transaction(async (trx) => {
          await trx
            .table("app_user")
            .update({
              status: 0
            }).where("id","=",req.params.id)
      })
      .then(function () {
        res.status(200).json({
          message: "Successfully checked colis",
          status: 200,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});

/**
 * @swagger
 * /user/active/{id}:
 *   put:
 *     summary: update  provider.  
 *     description: Id of user.
 *     tags:
 *       - users 
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
 *
 *                     comapny:          # <!--- form field email
 *                          type: string
 *                     codePostal:          # <!--- form field email
 *                          type: string
 *                     codeFiscal:          # <!--- form field email
 *                          type: string
*/
app.put("/activer/user/:id",  async (req, res, next) => {
  console.log(req.params)
  try {
  console.log(req.params)
    app.db
      .transaction(async (trx) => {
          await trx
            .table("app_user")
            .update({
              status: "ACTIVE"
            }).where("id","=",req.params.id)
      })
      .then(function () {
        res.status(200).json({
          message: "Successfully checked colis",
          status: 200,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});