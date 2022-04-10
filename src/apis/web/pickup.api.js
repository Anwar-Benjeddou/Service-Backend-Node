const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");

/**
 * @swagger
 * components:
 *   schemas:
 *     colis:
 *       type: object
 *       properties:
 *
 *         code_postal:
 *          type: string
 *          description: The colis's code_postal.
 *          example: oumaima
 *         name_complete:
 *          type: string
 *          description: The colis's name_complete.
 *          example: oumaima
 *         pickup:
 *          type: string
 *          description: The colis's pickup.
 *          example: oumaima
 *         phone_number:
 *          type: string
 *          description: The colis's  phone number,
 *          example: 50998877
 *         address:
 *          type: string
 *          description: The colis's address.
 *          example: TUNIS, marsa
 *         price:
 *          type: intger
 *          description: The colis's price.
 *          example: 44.44
 *         weight:
 *          type: intger
 *          description: The colis's weight.
 *          example: 20
 *         email:
 *          type: string
 *          description: The colis's email.
 *          example: email@gmail.com
 *         status_delivery_exchange:
 *          type: string
 *          description: colis delivery status.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 *         payment_status:
 *          type: string
 *          description: The colis's payment Status can be 0 or 1 if the colis paid.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 *         payment_mode:
 *          type: string
 *          description: Mode of payment can be Checks, cards or  cash.
 *          example: Check
 *         city:
 *          type: string
 *          description: The colis's city.
 *          example: manar
 *         street:
 *          type: string
 *          description: The colis's payment_status.
 *          example: compus
 *         type_envoi:
 *          type: string
 *          description: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *          example: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *         designation:
 *          type: string
 *          description: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 *          example: LIVRAISON A DOMICILE / ECHANGE / RECUPERATION
 
 *     pickup:
 *       type: object
 *       properties:
 *         code:
 *          type: string
 *          description: The colis's code.
 *          example: oumaima
 *         driver:
 *          type: string
 *          description: The colis's driver.
 *          example: oumaima
 *         status_pickup:
 *          type: string
 *          description: The colis's status_pickup.
 *          example: TUNIS, marsa
 *         date_enlevement_souhaiter:
 *          type: date
 *          description: The colis's date_enlevement_souhaiter.
 *          example:
 *         date_enlevement:
 *          type: date
 *          description: The colis's date_enlevement.
 *          example:
 *         status_anomaly:
 *          type: string
 *          description: 0 if colis has status_anomaly.
 *          example: email@gmail.com
 *         colis:
 *          type: string
 *          description: colis delivery colis.
 *          example: FFCC7530-D4E9-11EB-B3D7-3FDE5A2D63D5
 *         check_replanification:
 *          type: string
 *          description: status of check pikup
 *          example: 0
 *         check_magasinier:
 *          type: string
 *          description: status of validat the default value is 0 by "magasinier"
 *          example: Check
 *         magasinier:
 *          type: string
 *          description: The colis's magasinier.
 *          example:
 */

/**
 * @swagger
 * /pickup/ad/group:
 *   post:
 *     summary: Create new colis and new pickup grouped multi lot. 
 *     description: when creating a client there is the creation of a pickup.
 *     tags:
 *      - pickup
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               agence:
 *                type: string
 *                description: The colis agence.
 * 
 *               data:
 *                 type: array 
 *                 description: The article values.
 *                 example: [ {phone_number : 0, designation : "", type_envoi : "",gouvernorat : "",address : "mars rue 23", "city":"marsa",email: "customr@gmail.com",name_complete: "aziza themri",code_postal: "4567",price: 45,weight: 4,payment_status: 0,payment_mode: "cach"},{phone_number : 0,designation : "", type_envoi : "",gouvernorat : "",address: "SFAX" , city: "cite ones",email: "colis3@gmil.com",name_complete: "badis dadou",code_postal: "5654",price: 56,weight: 3,payment_status: 1,payment_mode: "check",}]
 *
 *     responses:
 *       201:
 *         description: New colis created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/colis'

 
 */

app.post("/pickup/ad/group", [authJwt.verifyToken], async (req, res, next) => {
  try {
    console.log("i am here");
    const data = req.body.data; // Read excel document to js array

    const idProvider = req.userId;
    const agence_user = req.agence;
    const [nb_colis_setting] = await app
      .db("setting")
      .select("nb_colis", "id", "num_pickup");

    await app.db
      .transaction(async (trx) => {
        let index_colis = nb_colis_setting ? nb_colis_setting.nb_colis : 0;
        let code = nb_colis_setting ? parseInt(nb_colis_setting.num_pickup) : 0;

        let insert;
        if (data) {
          insert = data.map((infos_colis) => {
            let idpickup = uuid.v1().toLocaleUpperCase(),
              idcolis = uuid.v1().toLocaleUpperCase();
            let colisInsert = [],
              pickupInsert = [],
              historyInsert = [];

            if (infos_colis.lot && parseInt(infos_colis.lot) > 1) {
              let code_lot = "CODE-" + Math.floor(1000 + Math.random() * 9000);
              for (let i = 0; i < parseInt(infos_colis.lot); i++) {
                index_colis = index_colis + 1;
                code = code + 1;
                let idcolis2 = uuid.v1().toLocaleUpperCase();
                let idpickup2 = uuid.v1().toLocaleUpperCase();

                colisInsert.push({
                  id: idcolis2,
                  index_colis: index_colis,
                  address: infos_colis.addresse,
                  city: infos_colis.ville,
                  gouvernorat: infos_colis.gouvernorat.toUpperCase(),
                  email: infos_colis.email ? infos_colis.email : "",
                  phone_number: infos_colis.N_telephone,
                  name_complete: infos_colis.nom_client,
                  code_postal: infos_colis.code_postal
                    ? infos_colis.code_postal
                    : "",
                  price: i == 0 ? infos_colis.prix : 0,
                  weight: infos_colis.weight ? infos_colis.weight : 0,
                  payment_status: i == 0 ? "0" : "1",

                  payment_mode: infos_colis.mode_payment,
                  type_envoi: infos_colis.type_envoi,
                  designation: infos_colis.designation,
                  provider: idProvider,
                  agence: req.body.agence ? req.body.agence : agence_user,
                  code: code_lot,
                  lot: i == 0 ? parseInt(infos_colis.lot) : 1,
                });
                pickupInsert.push({
                  id: idpickup2,
                  code: "PICKUP-" + code,
                  colis: idcolis2,
                  date_enlevement_souhaiter: new Date(),
                });
                historyInsert.push({
                  id: uuid.v1().toLocaleUpperCase(),
                  action: idpickup2,
                  colis: idcolis2,
                  actionneurs: idProvider,
                  agence: req.agence,
                  event: "colis crée pour pickup",
                });
              }
            } else {
              index_colis = index_colis + 1;
              code = code + 1;

              colisInsert.push({
                id: idcolis,
                index_colis: index_colis,
                address: infos_colis.addresse,
                city: infos_colis.ville,
                gouvernorat: infos_colis.gouvernorat.toUpperCase(),
                email: infos_colis.email ? infos_colis.email : "",
                phone_number: infos_colis.N_telephone,
                name_complete: infos_colis.nom_client,
                code_postal: infos_colis.code_postal
                  ? infos_colis.code_postal
                  : "",

                price: infos_colis.prix,
                weight: infos_colis.weight ? infos_colis.weight : 0,
                payment_status: infos_colis.prix === 0 ? "1" : " 0",

                payment_mode: infos_colis.mode_payment,
                type_envoi: infos_colis.type_envoi,
                designation: infos_colis.designation,
                provider: idProvider,
                agence: req.body.agence ? req.body.agence : agence_user,
                code: "CODE-" + Math.floor(1000 + Math.random() * 9000),
                lot: 1,
              });

              pickupInsert.push({
                id: idpickup,
                code: "PICKUP-" + code,
                colis: idcolis,
                date_enlevement_souhaiter: new Date(),
              });
              historyInsert.push({
                id: uuid.v1().toLocaleUpperCase(),
                action: idpickup,
                colis: idcolis,
                actionneurs: idProvider,
                agence: req.agence,
                event: "colis crée pour pickup",
              });
            }

            return { colisInsert, pickupInsert, historyInsert };
          });

          var mergedInsertColis = [].concat.apply(
            [],
            insert.map((e) => e.colisInsert)
          );
          var mergedInsertPickup = [].concat.apply(
            [],
            insert.map((e) => e.pickupInsert)
          );
          var mergedInsertHistory = [].concat.apply(
            [],
            insert.map((e) => e.historyInsert)
          );
          if (nb_colis_setting) {
            await trx
              .table("setting")
              .update({
                nb_colis:
                  parseInt(nb_colis_setting.nb_colis) +
                  mergedInsertColis.length,
                num_pickup:
                  parseInt(nb_colis_setting.num_pickup) +
                  mergedInsertPickup.length,
              })
              .where("id", "=", nb_colis_setting.id);
          }
          await trx("colis").insert(mergedInsertColis);
          await trx("pickup").insert(mergedInsertPickup);

          await trx("colis_history").insert(mergedInsertHistory);
          res.status(201).json({
            message: "New colis/pickup created",
            status: 201,
            data: req.body,
          });
        } else {
          res.status(400).json({
            message: "upload file",
            status: 400,
            data: req.body,
          });
        }
      })

      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a colis."));
  }
});

/**
 * @swagger
 * /pickup/ad/one:
 *   post:
 *     summary: Create new colis and new pickup grouped multi lot. 
 *     description: when creating a client there is the creation of a pickup.
 *     tags:
 *      - pickup
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               agence:
 *                type: string
 *                description: The colis agence.
 * 
 *               data:
 *                 type: array 
 *                 description: The article values.
 *                 example: [ {phone_number : 0, designation : "", type_envoi : "",gouvernorat : "",address : "mars rue 23", "city":"marsa",email: "customr@gmail.com",name_complete: "aziza themri",code_postal: "4567",price: 45,weight: 4,payment_status: 0,payment_mode: "cach"},{phone_number : 0,designation : "", type_envoi : "",gouvernorat : "",address: "SFAX" , city: "cite ones",email: "colis3@gmil.com",name_complete: "badis dadou",code_postal: "5654",price: 56,weight: 3,payment_status: 1,payment_mode: "check",}]
 *
 *     responses:
 *       201:
 *         description: New colis created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/colis'

 
 */

app.post("/pickup/ad/one", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const infos_colis = req.body.data[0]; // Read excel document to js array

    const idProvider = req.userId;
    const agence_user = req.agence;
    const [nb_colis_setting] = await app
      .db("setting")
      .select("nb_colis", "id", "num_pickup");

    await app.db
      .transaction(async (trx) => {
        let index_colis = nb_colis_setting ? nb_colis_setting.nb_colis : 0;
        let code = nb_colis_setting ? parseInt(nb_colis_setting.num_pickup) : 0;

        let idpickup = uuid.v1().toLocaleUpperCase();
        let idcolis = uuid.v1().toLocaleUpperCase();
        let colisInsert = [],
          pickupInsert = [],
          historyInsert = [];

        if (parseInt(infos_colis.lot) && parseInt(infos_colis.lot) > 1) {
          let code_lot = "CODE-" + Math.floor(1000 + Math.random() * 9000);
          for (let i = 0; i < parseInt(infos_colis.lot); i++) {
            index_colis = index_colis + 1;
            code = code + 1;
            let idcolis2 = uuid.v1().toLocaleUpperCase();
            let idpickup2 = uuid.v1().toLocaleUpperCase();

            colisInsert.push({
              id: idcolis2,
              index_colis: index_colis,

              address: infos_colis.address,
              city: infos_colis.city,
              gouvernorat: infos_colis.gouvernorat.toUpperCase(),
              email: infos_colis.email ? infos_colis.email : "",
              phone_number: infos_colis.phone_number,
              name_complete: infos_colis.name_complete,
              code_postal: infos_colis.code_postal
                ? infos_colis.code_postal
                : "",
              price:
                i == 0 && infos_colis.payment_status === "1"
                  ? infos_colis.prix
                  : 0,
              weight: infos_colis.weight ? infos_colis.weight : 0,
              payment_status: i == 0 ? "1" : " 0",

              payment_mode: infos_colis.payment_mode,
              type_envoi: infos_colis.type_envoi,
              designation: infos_colis.designation,
              provider: idProvider,
              agence: req.body.agence ? req.body.agence : agence_user,
              code: code_lot,
              lot: i == 0 ? parseInt(infos_colis.lot) : 1,
            });
            pickupInsert.push({
              id: idpickup2,
              code: "PICKUP-" + code,
              colis: idcolis2,
              date_enlevement_souhaiter: new Date(),
            });
            historyInsert.push({
              id: uuid.v1().toLocaleUpperCase(),
              action: idpickup2,
              colis: idcolis2,
              actionneurs: idProvider,
              agence: req.agence,
              event: "colis crée pour pickup",
            });
          }
        } else {
          index_colis = index_colis + 1;
          code = code + 1;

          colisInsert.push({
            id: idcolis,
            index_colis: index_colis,
            address: infos_colis.address,
            city: infos_colis.city,
            gouvernorat: infos_colis.gouvernorat.toUpperCase(),
            email: infos_colis.email ? infos_colis.email : "",
            phone_number: infos_colis.phone_number,
            name_complete: infos_colis.name_complete,
            code_postal: infos_colis.code_postal ? infos_colis.code_postal : "",

            price: infos_colis.payment_status === "1" ? infos_colis.price : 0,
            weight: infos_colis.weight ? infos_colis.weight : 0,
            payment_status: infos_colis.payment_status,

            payment_mode: infos_colis.payment_mode,
            type_envoi: infos_colis.type_envoi,
            designation: infos_colis.designation,
            provider: idProvider,
            agence: req.body.agence ? req.body.agence : agence_user,
            code: "CODE-" + Math.floor(1000 + Math.random() * 9000),
            lot: 1,
          });

          pickupInsert.push({
            id: idpickup,
            code: "PICKUP-" + code,
            colis: idcolis,
            date_enlevement_souhaiter: new Date(),
          });
          historyInsert.push({
            id: uuid.v1().toLocaleUpperCase(),
            action: idpickup,
            colis: idcolis,
            actionneurs: idProvider,
            agence: req.agence,
            event: "colis crée pour pickup",
          });
        }

        console.log(colisInsert);
        if (nb_colis_setting) {
          await trx
            .table("setting")
            .update({
              nb_colis:
                parseInt(nb_colis_setting.nb_colis) + colisInsert.length,
              num_pickup:
                parseInt(nb_colis_setting.num_pickup) + pickupInsert.length,
            })
            .where("id", "=", nb_colis_setting.id);
        }
        await trx("colis").insert(colisInsert);
        await trx("pickup").insert(pickupInsert);

        await trx("colis_history").insert(historyInsert);
        res.status(201).json({
          message: "New colis/pickup created",
          status: 201,
          data: req.body,
        });
      })

      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a colis."));
  }
});

/**
 * @swagger
 * /delete/pickup:
 *   put:
 *     summary: delete pickup.
 *     description:  delete pickup.
 *     tags:
 *       - pickup
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID pickup.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         description: Successfully asociated
 
 *       500:
 *         description:  Invalid values to update a pickup
 *
 */
app.put("/delete/pickup/:id", async (req, res, next) => {
  try {
    await app.db
      .table("pickup")
      .update({ status_pickup: -3 })
      .where("id", "=", req.params.id);

    const colis = await app.db
      .table("pickup")
      .select("colis")
      .where("id", "=", req.params.id);
    await app.db
      .table("colis")
      .update({ etat_final: 1 })
      .where(
        "id",
        "=",
        colis.map((e) => e.id)
      );

    await trx.table("colis_history").insert({
      id: uuid.v1().toLocaleUpperCase(),
      action: req.params.id,
      colis: colis.map((e) => e.id),
      actionneurs: req.userId,
      agence: req.agence,
      event: "colis annuler by provider",
    });

    res.status(200).json({
      message: "Successfully updated",
      status: 200,
      data: req.body,
    });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /admin/pickup/annuler:
 *   get:
 *     summary: Retrieve a list of pickup for each user used annuler by provider.
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/admin/pickup/annuler",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const agence_user = req.agence;

      /*  const providers = await app.db
      .from("provider as p")
      .join("app_user as u ", "u.id", "p.id")
      .select("p.id")
      .where("agence", "=", agence_user); */
      const coliss = (await app.db.table("colis").where("etat_final", "=", 1))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("agence", "=", agence_user)
        .andWhere("etat_final", "=", 1);

      /* .where(
        "provider",
        "IN",
        providers.map((e) => e.id)
      ) */

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", -3)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
          .andWhere("status_pickup", "=", -3)
      )
        .map((e) => ({
          ...e,
          colis: coliss[e.colis],
          driver: driver[e.driver],
        }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
          message: "pickups   not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/annuler:
 *   get:
 *     summary: Retrieve a list of pickup for each user used annuler by provider.
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/provider/pickup/annuler",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const agence_user = req.agence;

      const providers = await app.db
        .from("provider as p")
        .join("app_user as u ", "u.id", "p.id")
        .select("p.id")
        .where("agence", "=", agence_user);
      const coliss = (await app.db.table("colis").where("etat_final", "=", 1))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("agence", "=", agence_user)
        .andWhere("etat_final", "=", 1)
        .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        );

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", -3)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
          .andWhere("status_pickup", "=", -3)
      )
        .map((e) => ({
          ...e,
          colis: coliss[e.colis],
          driver: driver[e.driver],
        }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
          message: "pickups   not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/console/list/driver:
 *   get:
 *     summary: Retrieve a list of pickup for each user used in affectation driver for delivery or exchange (affectation).
 *     description: list of pickup for each user.
 *     tags:
 *       - console
 *     parameters:
 *         - in: query
 *           name: driver
 *           schema:
 *             type: string
 *           description: The ID driver
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
 *
 *     responses:
 *       200:
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */

app.get(
  "/admin/console/list/driver",
  [authJwt.verifyToken],
  async (req, res) => {
    try {
      const driverId = req.query.driver;
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );
      const colis = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      if (driverId) {
        const console = (
          await app.db
            .table("console")
            .select("*")

            .andWhere("status_console", "=", 0)
            .where("driver", "=", driverId)
        ).map((e) => ({
          ...e,

          colis: colis[e.colis],
        }));

        if (console.length === 0) {
          return res.json({
            message: "console   not found  ",
            status: 200,
            data: console,
          });
        }
        res.json({
          message: "console  fetched",
          status: 200,
          data: console,
        });
        console.log("herererer");
      } else {
        res.json({
          message: "entry driver",
          status: 200,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @swagger
 * /pikup/add/driver:
 *   put:
 *     summary: add driver to pickup.
 *     description: add a driver for pickup.
 *     tags:
 *       - pickup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 type: string
 *                 description: The driver for pickup.
 *               coliss:
 *                 type: array
 *                 description: The coliss ids.
 *                 example: [ "8c9b7f81-e0dc-11eb-a938-c3de66044796","8caf0781-e0dc-11eb-a938-c3de66044796"]
 *
 *
 *
 *     responses:
 *       200:
 *         description: Successfully asociated
 
 *       500:
 *         description:  Invalid values to update a pickup
 *
 */
app.put("/pikup/add/driver", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const pickups = await app.db
      .table("pickup")
      .select("id")
      .where(
        "colis",
        "IN",
        req.body.coliss.map((e) => e)
      );
    console.log(pickups);
    pickups.forEach(async (pack) => {
      await app.db
        .table("pickup")
        .update({ driver: req.body.driver, updated_at: new Date() })
        .where("id", "=", pack.id);
    });

    res.status(200).json({
      message: "Successfully updated",
      status: 200,
      data: req.body,
    });
  } catch (error) {
    next(new createHttpError.InternalServerError(error));
  }
});

/**
 * @swagger
 * /admin/pickup/list:
 *   get:
 *     summary: Retrieve a list of pickup for each user used in affectation driver for delivery or exchange (affectation).
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get("/admin/pickup/list", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const driver = (
      await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const provider = (
      await app.db.table("provider as p").join("app_user as u ", "u.id", "p.id")
    ).reduce(
      (a, e) => ({
        ...a,
        [e.id]: e,
      }),
      {}
    );

    const agence_user = req.agence;

    /*  const providers = await app.db
      .from("provider as p")
      .join("app_user as u ", "u.id", "p.id")
      .select("p.id")
      .where("agence", "=", agence_user); */
    const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const idcoliss = await app.db
      .table("colis")
      .select("id")
      .where("agence", "=", agence_user)
      .andWhere("status_delivery_exchange", "=", 0)
      .andWhere("etat_final", "=", 0);

    /* .where(
        "provider",
        "IN",
        providers.map((e) => e.id)
      ) */

    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    let reqData = req.query;
    let pagination = {};
    let per_page = reqData.per_page || 10;
    let page = reqData.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    const total = await app.db
      .table("pickup")
      .count("* as count")
      .andWhere("status_pickup", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .andWhere(
        "colis",
        "IN",
        idcoliss.map((e) => e.id)
      )
      .first();
    const pickups = (
      await app.db
        .table("pickup")
        .select("*")
        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("status_pickup", "=", 2)
    )
      .map((e) => ({
        ...e,
        colis: coliss[e.colis],
        driver: driver[e.driver],
      }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
        message: "pickups   not found  ",
        status: 200,
        data: pagination,
      });
    }
    res.json({
      message: "colis fetched",
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
 * /admin/pickup/pending:
 *   get:
 *     summary: Retrieve a list of pickup for each user when status  pickup 0 (pending)(tracking) .
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/admin/pickup/pending",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const agence_user = req.agence;

      /* const providers = await app.db
        .from("provider as p")
        .join("app_user as u ", "u.id", "p.id")
        .select("p.id")
        .where("agence", "=", agence_user); */
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("agence", "=", agence_user)
        .andWhere("etat_final", "=", 0);
      /*  .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        ); */

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("status_pickup", "=", 0)
        .first();
      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 0)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
        driver: driver[e.driver],
      }));
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
          message: "pickup pending  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/pickup/ongoing:
 *   get:
 *     summary: Retrieve a list of pickup for each user when status pickup 1 (ongoing) (tracking).
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get(
  "/admin/pickup/ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const provider = (
        await app.db
          .table("provider as p")
          .join("app_user as u ", "u.id", "p.id")
      ).reduce(
        (a, e) => ({
          ...a,
          [e.id]: e,
        }),
        {}
      );

      const agence_user = req.agence;

      /* const providers = await app.db
        .from("provider as p")
        .join("app_user as u ", "u.id", "p.id")
        .select("p.id")
        .where("agence", "=", agence_user); */
      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("agence", "=", agence_user)
        .andWhere("etat_final", "=", 0);
      /* .where(
          "provider",
          "IN",
          providers.map((e) => e.id)
        ); */

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("status_pickup", "=", 1)
        .first();
      const pickups = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 1)
          .andWhere(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({
        ...e,
        colis: coliss[e.colis],
        driver: driver[e.driver],
      }));
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
          message: "pickup ongoing  not found  ",
          status: 200,
          data: pagination,
        });
      }
      res.json({
        message: "pickup fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);
/**
 * @swagger
 * /admin/pickup/done:
 *   get:
 *     summary: Retrieve a list of pickup for each user when status pickup 2 (done) (tracking).
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
app.get("/admin/pickup/done", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const driver = (
      await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const provider = (
      await app.db.table("provider as p").join("app_user as u ", "u.id", "p.id")
    ).reduce(
      (a, e) => ({
        ...a,
        [e.id]: e,
      }),
      {}
    );

    const agence_user = req.agence;

    /* const providers = await app.db
      .from("provider as p")
      .join("app_user as u ", "u.id", "p.id")
      .select("p.id")
      .where("agence", "=", agence_user); */
    const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const idcoliss = await app.db
      .table("colis")
      .select("id")
      .where("agence", "=", agence_user)
      .andWhere("etat_final", "=", 0);
    /*  .where(
        "provider",
        "IN",
        providers.map((e) => e.id)
      ); */

    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    let reqData = req.query;
    let pagination = {};
    let per_page = reqData.per_page || 10;
    let page = reqData.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    const total = await app.db
      .table("pickup")
      .count("* as count")
      .andWhere(
        "colis",
        "IN",
        idcoliss.map((e) => e.id)
      )
      .andWhere("status_pickup", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .andWhere("check_magasinier", "=", 0)

      .first();
    const pickups = (
      await app.db
        .table("pickup")
        .select("*")
        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
        .andWhere("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .andWhere("check_magasinier", "=", 0)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
    ).map((e) => ({
      ...e,
      colis: coliss[e.colis],
      driver: driver[e.driver],
    }));
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
        message: "pickup done  not found  ",
        status: 200,
        data: pagination,
      });
    }
    res.json({
      message: "colis fetched",
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
 * /pickup/group/add:
 *   post:
 *     summary: Create new colis and new pickup grouped. 
 *     description: when creating a client there is the creation of a pickup.
 *     tags:
 *      - pickup
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               agence:
 *                type: string
 *                description: The colis agence.
 * 
 *               data:
 *                 type: array 
 *                 description: The article values.
 *                 example: [ {phone_number : 0, designation : "", type_envoi : "",gouvernorat : "",address : "mars rue 23", "city":"marsa",email: "customr@gmail.com",name_complete: "aziza themri",code_postal: "4567",price: 45,weight: 4,payment_status: 0,payment_mode: "cach"},{phone_number : 0,designation : "", type_envoi : "",gouvernorat : "",address: "SFAX" , city: "cite ones",email: "colis3@gmil.com",name_complete: "badis dadou",code_postal: "5654",price: 56,weight: 3,payment_status: 1,payment_mode: "check",}]
 *
 *     responses:
 *       201:
 *         description: New colis created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/colis'

 
 */

app.post("/pickup/group/add", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const data = req.body.data; // Read excel document to js array

    const idProvider = req.userId;
    const agence_user = req.agence;
    const [nb_colis_setting] = await app
      .db("setting")
      .select("nb_colis", "id", "num_pickup");

    let nb_colis = 0;
    await app.db
      .transaction(async (trx) => {
        for (let d of data) {
          console.log(d);
          nb_colis++;

          const idpickup = uuid.v1().toLocaleUpperCase();
          const idcolis = uuid.v1().toLocaleUpperCase();
          const idPay = uuid.v1().toLocaleUpperCase();
          await trx.table("colis").insert({
            id: idcolis,
            index_colis: nb_colis_setting
              ? nb_colis_setting.nb_colis + nb_colis
              : nb_colis,
            address: d.addresse,
            city: d.ville,
            gouvernorat: d.gouvernorat.toUpperCase(),
            email: d.email,
            phone_number: d.N_telephone,
            name_complete: d.nom_client,
            code_postal: d.code_postal,
            price: d.prix,
            weight: d.weight,
            payment_status: d.prix === 0 ? "1" : " 0",

            payment_mode: d.mode_payment,
            type_envoi: d.type_envoi,
            designation: d.designation,
            provider: idProvider,
            agence: req.body.agence ? req.body.agence : agence_user,
            code: "CODE-" + Math.floor(1000 + Math.random() * 9000),
            lot: d.lot ? parseInt(d.lot) : 1,
          });

          await trx.table("pickup").insert({
            id: idpickup,
            code:
              "PICKUP-" + nb_colis_setting
                ? parseInt(nb_colis_setting.num_pickup) + nb_colis
                : nb_colis,
            colis: idcolis,
            date_enlevement_souhaiter: new Date(),
          });

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: idPay,
            colis: idcolis,
            actionneurs: idProvider,
            agence: req.agence,
            event: "colis crée pour pickup",
          });
          console.log(nb_colis_setting);

          if (nb_colis_setting) {
            await trx
              .table("setting")
              .update({
                nb_colis: parseInt(nb_colis_setting.nb_colis) + data.length,
                num_pickup: parseInt(nb_colis_setting.num_pickup) + data.length,
              })
              .where("id", "=", nb_colis_setting.id);
          }
        }
      })
      .then(async () => {
        res.status(201).json({
          message: "New colis/pickup created",
          status: 201,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a colis."));
  }
});

/**
 * @swagger
 * /pickup/one/add:
 *   post:
 *     summary: Create new colis and new pickup . 
 *     description: when creating a client there is the creation of a pickup.
 *     tags:
 *      - pickup
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       decription: Optional description in *Markdown*
 *       reuired: false
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               agence:
 *                type: string
 *                description: The colis agence.
 * 
 *               data:
 *                 type: array 
 *                 description: The article values.
 *                 example: [ {phone_number : 0, designation : "", type_envoi : "",gouvernorat : "",address : "mars rue 23", "city":"marsa",email: "customr@gmail.com",name_complete: "aziza themri",code_postal: "4567",price: 45,weight: 4,payment_status: 0,payment_mode: "cach"},{phone_number : 0,designation : "", type_envoi : "",gouvernorat : "",address: "SFAX" , city: "cite ones",email: "colis3@gmil.com",name_complete: "badis dadou",code_postal: "5654",price: 56,weight: 3,payment_status: 1,payment_mode: "check",}]
 *
 *     responses:
 *       201:
 *         description: New colis created
 *         content:
 *           application/json:
 *             schema:
 *                 -  $ref: '#/components/schemas/colis'

 
 */

app.post("/pickup/one/add", [authJwt.verifyToken], async (req, res, next) => {
  try {
    const data = req.body.data; // Read excel document to js array

    const idProvider = req.userId;
    const agence_user = req.agence;
    const [nb_colis_setting] = await app
      .db("setting")
      .select("nb_colis", "id", "num_pickup");

    let nb_colis = 0;
    await app.db
      .transaction(async (trx) => {
        for (let d of data) {
          console.log(d);
          nb_colis++;

          const idpickup = uuid.v1().toLocaleUpperCase();
          const idcolis = uuid.v1().toLocaleUpperCase();
          const idPay = uuid.v1().toLocaleUpperCase();
          await trx.table("colis").insert({
            id: idcolis,
            index_colis: nb_colis_setting
              ? nb_colis_setting.nb_colis + nb_colis
              : nb_colis,
            address: d.address,
            city: d.city,
            gouvernorat: d.gouvernorat,
            email: d.email,
            phone_number: d.phone_number,
            name_complete: d.name_complete,
            code_postal: d.code_postal,
            price: d.payment_status === "1" ? d.price : 0,
            weight: d.weight,
            payment_status: d.payment_status,

            payment_mode: d.payment_mode,
            type_envoi: d.type_envoi,
            designation: d.designation,
            provider: idProvider,
            agence: req.body.agence ? req.body.agence : agence_user,
            code: "CODE-" + Math.floor(1000 + Math.random() * 9000),

            lot: d.lot ? parseInt(d.lot) : 0,
          });

          await trx.table("pickup").insert({
            id: idpickup,
            code:
              "PICKUP-" + nb_colis_setting
                ? parseInt(nb_colis_setting.num_pickup) + nb_colis
                : nb_colis,
            colis: idcolis,
            date_enlevement_souhaiter: new Date(),
          });

          await trx.table("colis_history").insert({
            id: uuid.v1().toLocaleUpperCase(),
            action: idPay,
            colis: idcolis,
            actionneurs: idProvider,
            agence: req.agence,
            event: "colis crée pour pickup",
          });
          console.log(nb_colis_setting);

          if (nb_colis_setting) {
            await trx
              .table("setting")
              .update({
                nb_colis: parseInt(nb_colis_setting.nb_colis) + data.length,
                num_pickup: parseInt(nb_colis_setting.num_pickup) + data.length,
              })
              .where("id", "=", nb_colis_setting.id);
          }
        }
      })
      .then(async () => {
        res.status(201).json({
          message: "New colis/pickup created",
          status: 201,
          data: req.body,
        });
      })
      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (err) {
    console.log(err);
    next(new createHttpError.BadRequest("Invalid values to create a colis."));
  }
});

/**
 * @swagger
 * /provider/pickup/list:
 *   get:
 *     summary: Retrieve a list of pickup for each provider (tracking).
 *     description: list of pickup for each provider.
 *     tags:
 *       - pickup
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/provider/pickup/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const coliss = (
        await app.db.table("colis").where("etat_final", "=", 0).andWhere("provider", "=", user)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0);
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )

        .first();
      let pickup = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));
      var count = total.count;
      var rows = pickup;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;

      if (rows.length === 0) {
        return res.json({
          message: "colis for this provider not found  ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/pending:
 *   get:
 *     summary: Retrieve a list of coliss for each provider when status is 0 (pickup pending) (tracking).
 *     description: list of coliss for each provider.
 *     tags:
 *       - pickup
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/provider/pickup/pending",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);
      const coliss = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", 0)
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .first();
      let pickupPending = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 0)
          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));

      var count = total.count;
      var rows = pickupPending;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickupPending.length === 0) {
        return res.json({
          message: "colis pending for pickup not found  ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/done:
 *   get:
 *     summary: Retrieve a list of coliss for each provider when status of pickup is 2 (pickup done)(tracking).
 *     description: list of coliss for each provider.
 *     tags:
 *       - pickup
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/provider/pickup/done",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0);
      const coliss = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", 2)
        .andWhere("status_anomaly", "=", 0)
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )

        .first();
      let pickupPending = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 2)
          .andWhere("status_anomaly", "=", 0)

          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));

      var count = total.count;
      var rows = pickupPending;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickupPending.length === 0) {
        return res.json({
          message: "colis pending for pickup not found  ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/ongoing:
 *   get:
 *     summary: Retrieve a list of coliss for each provider when status of pickup is 1 (pickup ongoing)(tracking).
 *     description: list of coliss for each provider.
 *     tags:
 *       - pickup
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/provider/pickup/ongoing",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user)
        .andWhere("etat_final", "=", 0);
      const coliss = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", 1)
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )

        .first();
      let pickupPending = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", 1)
          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));

      var count = total.count;
      var rows = pickupPending;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickupPending.length === 0) {
        return res.json({
          message: "colis pending for pickup not found  ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/not_ready:
 *   get:
 *     summary: Retrieve a list of coliss for each provider when status of pickup is -1 (pickup not ready )(tracking).
 *     description: list of coliss for each provider not yet validate .
 *     tags:
 *       - pickup
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
 *         decription: colis fetched with the given provider
 *       400:
 *         description: colis not found with the given provider.
 *
 */

app.get(
  "/provider/pickup/not_ready",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;

      const idcoliss = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", user);
      const coliss = (await app.db.table("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const total = await app.db
        .table("pickup")
        .count("* as count")
        .andWhere("status_pickup", "=", -1)
        .where(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )

        .first();
      let pickupPending = (
        await app.db
          .table("pickup")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .andWhere("status_pickup", "=", -1)
          .where(
            "colis",
            "IN",
            idcoliss.map((e) => e.id)
          )
      ).map((e) => ({ ...e, colis: coliss[e.colis] }));

      var count = total.count;
      var rows = pickupPending;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (pickupPending.length === 0) {
        return res.json({
          message: "colis not ready for pickup not found  ",
          status: 200,
          data: rows,
        });
      }
      res.json({
        message: "colis fetched",
        status: 200,
        data: pagination,
      });
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /provider/pickup/to_ready:
 *   put:
 *     summary: update status package to ready for pickup (status=0).
 *     tags:
 *       - pickup
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
 
 *             coliss:
 *               type: array
 *               example:  [ "8c9b7f81-e0dc-11eb-a938-c3de66044796", "8caf0781-e0dc-11eb-a938-c3de66044796"]
 
 
 *     responses:
 *       201:
 *         description: pickup to ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     coliss:
 *                       type: array
 *                       description: The package's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/provider/pickup/to_ready",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      await app.db
        .transaction(async (trx) => {
          const pickups = await trx
            .table("pickup")
            .select("*")
            .where(
              "colis",
              "IN",
              req.body.coliss.map((e) => e)
            );
          for (const pack of pickups) {
            await trx
              .table("pickup")
              .update({ status_pickup: 0, updated_at: new Date() })
              .where("id", "=", pack.id);

            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: pack.id,
              colis: pack.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "pickup prête",
            });
          }
        })
        .then(function () {
          console.log("Transaction complete.");
          res.status(200).json({
            message: "Successfully updated package",
            status: 200,
            data: req.body,
          });
        })
        .catch(function (err) {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      next(new createHttpError.BadRequest("Invalid values to create a colis."));
    }
  }
);

/**
 * @swagger
 * /provider/list/pickup/{id}:
 *   get:
 *     summary: Retrieve a list of provider have pickups pending to associate driver.
 *     description: Retrieve a list of pickup.
 *     tags:
 *       - pickup
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the zone to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of pickup.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *
 *       500:
 *         description : Internal server
 */

app.get("/provider/list/pickup/:id", async (req, res, next) => {
  try {
    const user = req.params.id;
    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    let reqData = req.query;
    let pagination = {};
    let per_page = reqData.per_page || 500;
    let page = reqData.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    const driver = (
      await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const idcoliss = await app.db
      .table("colis")
      .select("id")
      .where("provider", "=", user)
      .andWhere("etat_final", "=", 0);
    const coliss = (
      await app.db.table("colis").where("etat_final", "=", 0)
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const total = await app.db
      .table("pickup")
      .count("* as count")
      .andWhere("status_pickup", "=", 0)
      .where(
        "colis",
        "IN",
        idcoliss.map((e) => e.id)
      )

      .first();
    let pickupPending = (
      await app.db
        .table("pickup")
        .select("*")
        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
        .andWhere("status_pickup", "=", 0)
        .where(
          "colis",

          "IN",
          idcoliss.map((e) => e.id)
        )
    ).map((e) => ({ ...e, colis: coliss[e.colis], driver: driver[e.driver] }));

    var count = total.count;
    var rows = pickupPending;
    pagination.total = count;
    pagination.per_page = per_page;
    pagination.offset = offset;
    pagination.to = offset + rows.length;
    pagination.last_page = Math.ceil(count / per_page);
    pagination.current_page = page;
    pagination.from = offset;
    pagination.data = rows;
    if (pickupPending.length === 0) {
      return res.json({
        message: "colis pending for pickup not found  ",
        status: 200,
        data: rows,
      });
    }
    res.json({
      message: "colis fetched",
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
 * /pikup/driver/provider:
 *   put:
 *     summary: add driver to pickup by provider.
 *     description: add a driver for pickup by provider.
 *     tags:
 *       - pickup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               driver:
 *                 type: string
 *                 description: The driver for pickup.
 *               provider:
 *                 type: string
 *                 description: The coliss ids.
 *                 example:  "8c9b7f81-e0dc-11eb-a938-c3de66044796"
 *
 *
 *
 *     responses:
 *       200:
 *         description: Successfully asociated
 
 *       500:
 *         description:  Invalid values to update a pickup
 *
 */
app.put(
  "/pikup/driver/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const idcolis = await trx
            .table("colis")
            .select("id")
            .where("provider", "=", req.body.provider);
          const pickups = await trx
            .table("pickup")
            .select("id")
            .where(
              "colis",
              "IN",
              idcolis.map((e) => e.id)
            );
          if (pickups.length === 0) {
            res.status(200).json({
              message: "pickups not found",
              status: 200,
              data: req.body,
            });
          }
          {
            pickups.forEach(async (pack) => {
              await trx
                .table("pickup")
                .update({
                  driver: req.body.driver,
                  updated_at: new Date(),
                })
                .where("id", "=", pack.id)
                .andWhere("status_pickup", "=", 0);
            });
          }
          await trx.table("provider_pickup").insert({
            id: uuid.v1().toLocaleUpperCase(),
            driver: req.body.driver,
            provider: req.body.provider,
            quantity: pickups.length,
          });
        })
        .then(() => {
          res.status(200).json({
            message: "Successfully updated",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  }
);
/**
 * @swagger
 * /provider/pickup/list/depot:
 *   get:
 *     summary: Retrieve a list of pickup for each user used in affectation driver for delivery or exchange (affectation).
 *     description: list of pickup for each user.
 *     tags:
 *       - pickup
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
 *         decription: pickups fetched .
 *       400:
 *         description: pickups not found .
 *
 */
 app.get("/provider/pickup/list/depot", [authJwt.verifyToken], async (req, res, next) => {
  try {
   
 

    const user = req.userId;
    console.log(req.userId)

    /*  const providers = await app.db
      .from("provider as p")
      .join("app_user as u ", "u.id", "p.id")
      .select("p.id")
      .where("agence", "=", agence_user); */
    const coliss = (await app.db.table("colis").where("etat_final", "=", 0).andWhere("provider", "=", user))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const idcoliss = await app.db
      .table("colis")
      .select("id")
      .where("provider", "=", user)
      .andWhere("status_delivery_exchange", "=", 0)
      .andWhere("etat_final", "=", 0);



      
    /* .where(
        "provider",
        "IN",
        providers.map((e) => e.id)
      ) */

    const orderByColumn = req.query.order_by_column || "created_at";
    const orderByDirection = req.query.order_by_direction || "desc";
    let reqData = req.query;
    let pagination = {};
    let per_page = reqData.per_page || 10;
    let page = reqData.current_page || 1;
    if (page < 1) page = 1;
    var offset = (page - 1) * per_page;
    const total = await app.db
      .table("pickup")
      .count("* as count")
      .andWhere("status_pickup", "=", 2)
      .andWhere("status_anomaly", "=", 0)
      .andWhere(
        "colis",
        "IN",
        idcoliss.map((e) => e.id)
      )
      .first();
    const pickups = (
      await app.db
        .table("pickup")
        .select("*")
        .orderBy(orderByColumn, orderByDirection)
        .offset(offset)
        .limit(per_page)
        .andWhere(
          "colis",
          "IN",
          idcoliss.map((e) => e.id)
        )
        .andWhere("status_pickup", "=", 2)
    )
      .map((e) => ({
        ...e,
        colis: coliss[e.colis],
      }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});
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
        message: "pickups   not found  ",
        status: 200,
        data: pagination,
      });
    }
    res.json({
      message: "colis fetched",
      status: 200,
      data: pagination,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});
