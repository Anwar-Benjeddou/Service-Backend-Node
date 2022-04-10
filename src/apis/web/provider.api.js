const app = require("../../../index");
const uuid = require("uuid");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
let _ = require("lodash");

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     provider:
 *       type: object
 *       properties:

 *         code_fiscal:
 *          type: string
 *          description: The provider's code_fiscal.
 *          example: AZRDQ44
 *         code_postal:
 *          type: string
 *          description: The provider's code_postal.
 *          example: 3434
 *         company:
 *          type: string
 *          description: The provider's company.
 *          example: TUNIS
 *

 *     scale:
 *       type: object
 *       properties:
 
 *         article:
 *          type: string
 *          description: The provider's article.
 *          example: AZRDQ44
 *         provider:
 *          type: string
 *          description: The provider.
 *          example: 3434
 *         prix-initial:
 *          type: double
 *          description: The article's price.
 *          example: 34.34
 *         poids-initial:
 *          type: double
 *          description: The article's intial weight.
 *          example: 34.34
 *         podis-supplimentaire:
 *          type: double
 *          description: The article's weight .
 *          example: 34.34
 *
 *
 *
 */

/**
 * @swagger
 * /addProvider:
 *   post:
 *     summary: Create new provider.
 *     description:
 *     tags:
 *       - provider
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
 *               -  $ref: '#/components/schemas/provider'
 *             properties:
 *               articles:
 *                 type: array
*                 description: The article values.
 *                 example: [ {
      "id": "041e200c-f568-463c-ae15-d246b30287f6",
      "priceInitial": 989,
      "poidsInitial": 90,
      "poidsSupplimentaire": null
    },
    {
      "id": "20324528-ab1e-4964-8fdf-2993dfd9365b",
      "priceInitial": 7,
      "poidsInitial": 8,
      "poidsSupplimentaire": null
    },
{
      "id": "23013665-efd5-4efe-9f27-a0553a284ae8",
      "priceInitial": 3,
      "poidsInitial": 5,
      "poidsSupplimentaire": 1
    },
    {
      "id": "6d7c7856-12f4-4173-bb35-dd8323770e8f",
      "priceInitial": 7,
      "poidsInitial": null,
      "poidsSupplimentaire": null
    },
 {
      "id": "db5f66bb-5547-408a-bc13-f2f4e90e9d06",
      "priceInitial": 16,
      "poidsInitial": null,
      "poidsSupplimentaire": null
    },] 
 *               privilege:
 *                 type: string
 *                 description: The privilege's ID.
 *                 example: c5d419e3-5d47-464a-aa9e-f6a0d6ad9ee3
 *               permissions:
 *                 type: array
 *                 description: The permission's ID.
 *                 example: ['998f0c20-7634-418e-bd6f-6676a28cc140']
 *
 *
 *         application/xml:
 *           schema:
 *            allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/provider'
 *         application/x-www-form-urlencoded:
 *           schema:
 *           allOf:
 *               -  $ref: '#/components/schemas/app_user'
 *               -  $ref: '#/components/schemas/provider'
 *         text/plain:
 *           schema:
 *            type: string
 *
 *
 *     responses:
 *       201:
 *         description: New provider created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/provider'

 
 */
app.post(
  "/addProvider",
  /* [authJwt.verifyToken],  */ async (req, res, next) => {
    try {
      const {
        username,
        lastname,
        phone_number,
        address,
        email,
        firstname,
        password,
        descriminator,
        company,
        code_fiscal,
        code_postal,
        agence,
        privilege,
        permissions,
        articles,
      } = req.body;
      app.db.transaction(async (trx) => {
        const idprovider = uuid.v1().toLocaleUpperCase();
        await trx.table("app_user").insert({
          id: idprovider,
          username: username,
          lastname: lastname,
          firstname: firstname,
          phone_number: phone_number,
          address: address,
          email: email,
          agence: agence,
          password: password,
          descriminator: descriminator.toLocaleUpperCase(),
        });
        await trx.table("provider").insert({
          id: idprovider,
          company: company,
          code_postal: code_postal,
          code_fiscal: code_fiscal,
        });
        articles.forEach(async (article) => {
          const idscale = uuid.v1().toLocaleUpperCase();
          await trx.table("scale").insert({
            id: idscale,
            provider: idprovider,
            article: article.id,
            price_initial: article.priceInitial,
            poids_initial: article.poidsInitial,
            poids_supplimentaire: article.poidsSupplimentaire,
          });
        });

        permissions.map(async (permission) => {
          await trx.table("user_permission").insert({
            users: idprovider,
            permissions: permission,
          });
        });

        await trx
          .table("user_privilege")
          .insert({
            users: idprovider,
            privileges: privilege,
          })
          .then(() => {
            res.status(201).json({
              message: "New provider created",
              status: 201,
              data: req.body,
            });
          });
      });
    } catch (err) {
      next(
        new createHttpError.BadRequest("Invalid values to create a provider.")
      );
    }
  }
);

/**
 * @swagger
 * /provider:
 *   get:
 *     summary: Retrieve a list of provider
 *     description: Retrieve a list of provider .
 *     tags:
 *       - provider
 *     responses:
 *       200:
 *         description: A list of provider.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/zone'
 *       500:
 *         description : Internal server
 */

app.get(
  "/provider",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      // const user_agence = req.agence;
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const rows = (
        await app.db
          .from("provider " + " as p")
          .select("*")
          .join("app_user as u ", "u.id", "p.id")
      ).map((e) => ({ ...e, agence: agence[e.agence] }));
      if (rows.length === 0) {
        return res.json({
          message: "provider not found ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "provider fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
/**
 * @swagger
 * /provider/scale/{id}:
 *   get:
 *     summary: Retrieve a scale of provider.
 *     description: Retrieve a list of scale of provider .
 *     tags:
 *       - provider
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String id type of id.
 *     responses:
 *       200:
 *         description: A list of scale per provider.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/scale'
 *       500:
 *         description : Internal server
 */

app.get(
  "/provider/scale/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      // const user_agence = req.agence;
      const article = (await app.db.table("article").select("id", "article")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const scale = (await app.db.table("scale")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const rows = (
        await app.db
          .from("scale")
          .select("*")
          .where("provider", "=", req.params.id)
      ).map(e=>({...e,article:article[e.article]}))
      if (rows.length === 0) {
        return res.json({
          message: "scale not found with the given id",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "scale fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/edit/{id}:
 *   put:
 *     summary: update  provider.
 *     description: Id of user
 *     tags:
 *       - provider
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
 *               -  $ref: '#/components/schemas/provider'
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
 *                     code_postal:          # <!--- form field email
 *                          type: string
 *                     code_fiscal:          # <!--- form field email
 *                          type: string
 */
app.put("/provider/edit/:id", [authJwt.verifyToken], async (req, res, next) => {
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
        code_postal,
        company,
        agence,
        code_fiscal,
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
            agence: agence,
            password: password,
            descriminator: descriminator,
          })
          .where("id", "=", req.params.id);
      }

      if (code_fiscal || code_postal || company) {
        await trx
          .table("provider")
          .update({
            code_fiscal: code_fiscal,
            code_postal: code_postal,
            company: company,
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
      res.status(200).json({
        message: " user updated",
        status: 200,
        data: req.body,
      });
    });
  } catch (err) {
    next(
      new createHttpError.BadRequest("Invalid values to create a customer.")
    );
  }
});

/**
 * @swagger
 * /provider/scale/{scale}/{id}:
 *   put:
 *     summary: update  scale of provider.
 *     description: Id of user
 *     tags:
 *       - provider
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             schema:
 *               type: object
 *             properties:
 *               poidsInitial:
 *                 type: integer
 *                 description: The poidsInitial's ID.
 *                 example: 15 
 *               priceInitial:
 *                 type: intger
 *                 description: The priceInitial .
 *                 example: 33
 *               poidsSupplimentaire:
 *                 type: integer
 *                 description: The poidsSupplimentaire.
 *                 example: 2
 
 *     parameters:
 *       - in: path
 *         name: scale
 *         required: true
 *         description: String id type of scale.
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID provider.
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
 *                     priceInitial:          # <!--- form field price_initial
 *                             type: double
 *                     poidsInitial:          # <!--- form field poids_initial
 *                             type: double
 *                     poidsSupplimentaire:          # <!--- form field poids_supplimentaire
 *                              type: double
 
 */
app.put(
  "/provider/scale/:scale/:id",
  /* [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      app.db.transaction(async (trx) => {
        if (req.body) {
          await trx
            .table("scale")
            .update({
              ...req.body,
              updated_at: new Date(),
            })
            .where("id", "=", req.params.scale)
            .andWhere("provider", "=", req.params.id)
            .then(() => {
              res.status(200).json({
                message: " scale provider updated",
                status: 200,
                data: req.body,
              });
            });
        }
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
 * /provider/info/{id}:
 *   get:
 *     summary: Retrieve a single provider.
 *     description: Retrieve a single provider.
 *     tags:
 *       - provider
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: provider fetched with the given id
 *       400:
 *         description: provider not found with the given id
 *
 */
app.get(
  "/provider/info/:id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      // const user_agence = req.agence;
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const rows = (
        await app.db
          .from("provider " + " as p")
          .select("*")
          .where("p.id", "=", req.params.id)
          .join("app_user as u ", "u.id", "p.id")
      ).map((e) => ({ ...e, agence: agence[e.agence] }));
      if (rows.length === 0) {
        return res.json({
          message: "provider not found with given ID ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "provider fetched",
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
 * /provider_id:
 *   get:
 *     summary: Retrieve a list of provider grouped id
 *     description: Retrieve a list of provider .
 *     tags:
 *       - provider
 *     responses:
 *       200:
 *         description: A list of provider grouped id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/zone'
 *       500:
 *         description : Internal server
 */
app.get(
  "/provider_id",
  /*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
      // const user_agence = req.agence;
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      const rows = (
        await app.db
          .from("provider " + " as p")
          .select("*")
          .join("app_user as u ", "u.id", "p.id")
      ).map((e) => ({ ...e, agence: agence[e.agence] })).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      )
      
      _.omit(rows, ['id'])
      if (rows.length === 0) {
        return res.json({
          message: "provider not found ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "provider fetched",
        status: 200,
        data: rows,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);