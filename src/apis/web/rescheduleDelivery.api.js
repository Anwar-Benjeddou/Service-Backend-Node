const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");
const _ = require("lodash");

/**
 * @swagger
 * /delivery/reschedule/list:
 *   get:
 *     summary: Retrieve a list of  reschedule delivery for driver assign .
 *     description:  Retrieve a list of  reschedule delivery.
 *     tags:
 *       - reschedule_delivery
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
  "/delivery/reschedule/list",
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

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const [num_tentative_setting] = await app
        .db("setting")
        .select("*")
        .pluck("nb_tentative");
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_anomaly", "=", 1)
        .andWhere("status_delivery", "=", 2)
        .andWhere("tentatif", "!=", num_tentative_setting)
        .where("check_replanification", "=", 0)
        .andWhere("agence_exchange", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_anomaly", "=", 1)
          .andWhere("status_delivery", "=", 2)
          .andWhere("tentatif", "!=", num_tentative_setting)
          .where("check_replanification", "=", 0)
          .andWhere("agence_exchange", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "Reshedule colis not found",
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
 * /delivery/to_reschedule:
 *   put:
 *     summary: reschedule delivery driver assigned 
 *     tags:
 *       -  reschedule_delivery  
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
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
 *              colis:
 *                   type: array
 *                   example:  [ "1323A010-D8EE-11EB-AF2C-7755068897C0", "13224080-D8EE-11EB-AF2C-7755068897C0"]
 *               
 
 *     responses:
 *       201:
 *         description: reschedulepickup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The pickup's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put(
  "/delivery/to_reschedule",
  [authJwt.verifyToken],
  async (req, res, next) => {
    const user = req.userId;
    const colis = req.body.colis;
    try {
      app.db
        .transaction(async (trx) => {
          const [num_tentative_setting] = await trx("setting")
            .select("*")
            .pluck("nb_tentative");

          let exist_InDelivery = await trx("delivery")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            .where("status_anomaly", "=", 0)
            .andWhere("status_delivery", "!=", 2)
            .where("check_replanification", "=", 1)
            .andWhere("agence_exchange", "=", req.agence);
          let to_remove = exist_InDelivery.map((el) => el.colis);
          console.log(to_remove);
          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });

          if (filtred.length > 0) {
            const coliss = filtred.map(() => {
              return {
                status_delivery_exchange: 1,
                updated_at: new Date(),
              };
            });

            const data = filtred.map(() => {
              return {
                check_replanification: 1,
                driver: req.body.driver,
                status_delivery: 0,
                status_anomaly: 0,
                date_replanification: new Date(),
                check_magasinier: 0,
                date_check_magasinier: null,
                check_retour: 0,
                magasinier: null,
              };
            });
            const anomaly = filtred.map(() => {
              return {
                status_replanifier: 1,
                agence: req.agence_user,
              };
            });
            const history = colis.map((idcolis) => {
              const id = uuid.v1().toLocaleUpperCase();

              return {
                id: uuid.v1().toLocaleUpperCase(),
                action: id,
                colis: idcolis,
                actionneurs: user,
                agence: req.agence,
                event: "livraison  replanifier",
              };
            });
            let i = 0;
            await trx("colis")
              .update(coliss[i++])
              .where(
                "id",
                "IN",
                filtred.map((colis) => colis)
              );

            const delivery = await trx("delivery")
              .select("id")
              .where(
                "colis",
                "IN",
                filtred.map((idcolis) => idcolis)
              );
            let j = 0;
            await trx("delivery")
              .update(data[j++])
              .where(
                "id",
                "IN",
                delivery.map((iddelivery) => iddelivery.id)
              );
            const idanomaly = await trx("anomaly_delivery")
              .select("id")
              .where(
                "colis",
                "IN",
                filtred.map((idcolis) => idcolis)
              );
            let c = 0;
            await trx("anomaly_delivery")
              .update(anomaly[c++])
              .where(
                "id",
                "IN",
                idanomaly.map((id) => id.id)
              );

            await trx("colis_history").insert(history);
            res.status(200).json({
              message: "Successfully updated delivery",
              status: 200,
              data: to_remove,
            });
          } else {
            res.status(200).json({
              message: "can't update",
              status: 200,
              data: to_remove,
            });
          }
        })

        .catch(function (err) {
          console.error(err);
          next(
            new createHttpError.InternalServerError("Internal server error")
          );
        });
    } catch (error) {
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /delivery/retour/list:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) colis for driver assign .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/delivery/retour/list",
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

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const [num_tentative_setting] = await app
        .db("setting")
        .select("*")
        .pluck("nb_tentative");
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_anomaly", "=", 1)
        .andWhere("status_delivery", "=", 2)
        .andWhere("tentatif", "=", num_tentative_setting)
        .andWhere("check_replanification", "=", 0)
        .andWhere("agence_exchange", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_anomaly", "=", 1)
          .andWhere("status_delivery", "=", 2)
          .andWhere("tentatif", "=", num_tentative_setting)
          .where("check_replanification", "=", 0)
          .andWhere("agence_exchange", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /colis/to_retour/to_provider_direct:
 *   put:
 *     summary: retour colis driver assigned  status_delivery= 3 in table colis and status_colis for said cancel colis
 *     tags:
 *       -  retour_delivery  
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
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
 *              colis:
 *                   type: array
 *                   example:  [ "1323A010-D8EE-11EB-AF2C-7755068897C0", "13224080-D8EE-11EB-AF2C-7755068897C0"]
 *               
 
 *     responses:
 *       201:
 *         description: retour colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     agence:
 *                       type: string
 *                       description: The agence's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The pickup's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put("/colis/to_retour/to_provider_direct", [authJwt.verifyToken], async (req, res, next) => {
  const user = req.userId;
  const agence_user = req.agence;
  const colis = req.body.colis;
  try {
    app.db
      .transaction(async (trx) => {
        const [num_tentative_setting] = await trx("setting")
          .select("*")
          .pluck("nb_tentative");

        let exist_InDelivery = await trx("delivery")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
          .where("status_anomaly", "=", 0)
          .andWhere("status_delivery", "!=", 2)
          .andWhere("tentatif", "!=", num_tentative_setting)
          .where("check_replanification", "=", 1)
          .andWhere("agence_exchange", "=", agence_user);
        let exist_InRetour_agence = await trx("retour_agence")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
          .andWhere("retour_status", "!=", 2);

        let exist_InRetour_provider = await trx("retour_provider")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          );
        let to_remove = _.unionBy(
          exist_InRetour_agence,
          exist_InDelivery,
          exist_InRetour_provider,
          "colis"
        ).map((el) => el.colis);

        const filtred = _.sortedUniq(colis).filter((el) => {
          return !to_remove.includes(el);
        });

        if (filtred.length > 0) {
          const data = filtred.map(() => {
            return {
              check_replanification: 1,
              driver: req.body.driver,
              status_delivery: 3,
            };
          });
          const anomaly = filtred.map(() => {
            return {
              status_replanifier: 1,
              agence: agence_user,
            };
          });
          const history = filtred.map((idcolis) => {
            const id = uuid.v1().toLocaleUpperCase();

            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: id,
              colis: idcolis,
              actionneurs: user,
              agence: req.agence,
              event: "retour planifier pour retour",
            };
          });

          const delivery = await trx("delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              filtred.map((idcolis) => idcolis)
            );
          let j = 0;
          await trx("delivery")
            .update(data[j++])
            .where(
              "id",
              "IN",
              delivery.map((iddelivery) => iddelivery.id)
            );
          const idanomaly = await trx("anomaly_delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              filtred.map((idcolis) => idcolis)
            );
          let c = 0;
          await trx("anomaly_delivery")
            .update(anomaly[c++])
            .where(
              "id",
              "IN",
              idanomaly.map((id) => id.id)
            );

          await trx("colis_history").insert(history);
          const info_colis = await trx("colis").where(
            "id",
            "IN",
            filtred.map((id) => id)
          );

          const to_provider = info_colis.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              colis: info.id,
              driver: req.body.driver,
              agence_provider: info.agence,
              provider: info.provider,
            };
          });


          if (to_provider.length !== 0) {
            console.log("here");

            await trx("retour_provider").insert(to_provider);
          }
          const exist_InFacture = await trx
            .table("facture")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((el) => el)
            );

          let to_remove = _.unionBy(
            exist_InFacture,
            "colis"
          ).map(el => el.colis)

          const filtred_F = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });
          if (filtred_F.length > 0) {
            const info_colis = await trx("colis").where(
              "id",
              "IN",
              filtred_F.map((el) => el)
            );
            const facture = info_colis.map((colis) => {
              const id = uuid.v1().toLocaleUpperCase();

              return {
                id: id,
                colis: colis.id,
                provider: colis.provider,
              };
            });
            await trx.table("facture").insert(facture);
          }
          res.status(200).json({
            message: "Successfully updated delivery",
            status: 200,
            data: to_remove,
          });
        } else {
          res.status(200).json({
            message: "can't update",
            status: 200,
            data: to_remove,
          });
        }
      })

      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
/**
 * @swagger
 * /colis/to_retour:
 *   put:
 *     summary: retour colis driver assigned  status_delivery= 3 in table colis and status_colis for said cancel colis
 *     tags:
 *       -  retour_delivery  
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
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
 *              colis:
 *                   type: array
 *                   example:  [ "1323A010-D8EE-11EB-AF2C-7755068897C0", "13224080-D8EE-11EB-AF2C-7755068897C0"]
 *               
 
 *     responses:
 *       201:
 *         description: retour colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     agence:
 *                       type: string
 *                       description: The agence's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The pickup's IDs.
 *                       example:  [ "03de03c4-64fd-40e8-ba8c-b7273d06f83f", "03de03c4-64fd-40e8-ba8c-b7273d06f83f"]
 */
app.put("/colis/to_retour", [authJwt.verifyToken], async (req, res, next) => {
  const user = req.userId;
  const agence_user = req.agence;
  const colis = req.body.colis;
  try {
    app.db
      .transaction(async (trx) => {
        const [num_tentative_setting] = await trx("setting")
          .select("*")
          .pluck("nb_tentative");

        let exist_InDelivery = await trx("delivery")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
          .where("status_anomaly", "=", 0)
          .andWhere("status_delivery", "!=", 2)
          .andWhere("tentatif", "!=", num_tentative_setting)
          .where("check_replanification", "=", 1)
          .andWhere("agence_exchange", "=", agence_user);
        let exist_InRetour_agence = await trx("retour_agence")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
          .andWhere("retour_status", "!=", 2);

        let exist_InRetour_provider = await trx("retour_provider")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          );
        let to_remove = _.unionBy(
          exist_InRetour_agence,
          exist_InDelivery,
          exist_InRetour_provider,
          "colis"
        ).map((el) => el.colis);

        const filtred = _.sortedUniq(colis).filter((el) => {
          return !to_remove.includes(el);
        });

        if (filtred.length > 0) {
          const data = filtred.map(() => {
            return {
              check_replanification: 1,
              driver: req.body.driver,
              status_delivery: 3,
            };
          });
          const anomaly = filtred.map(() => {
            return {
              status_replanifier: 1,
              agence: agence_user,
            };
          });
          const history = filtred.map((idcolis) => {
            const id = uuid.v1().toLocaleUpperCase();

            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: id,
              colis: idcolis,
              actionneurs: user,
              agence: req.agence,
              event: "retour planifier pour retour",
            };
          });

          const delivery = await trx("delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              filtred.map((idcolis) => idcolis)
            );
          let j = 0;
          await trx("delivery")
            .update(data[j++])
            .where(
              "id",
              "IN",
              delivery.map((iddelivery) => iddelivery.id)
            );
          const idanomaly = await trx("anomaly_delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              filtred.map((idcolis) => idcolis)
            );
          let c = 0;
          await trx("anomaly_delivery")
            .update(anomaly[c++])
            .where(
              "id",
              "IN",
              idanomaly.map((id) => id.id)
            );

          await trx("colis_history").insert(history);
          const info_colis = await trx("colis").where(
            "id",
            "IN",
            filtred.map((id) => id)
          );

          const to_provider = info_colis.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();

            if (info.agence === agence_user) {
              return {
                id: id,
                colis: info.id,
                driver: req.body.driver,
                agence_provider: info.agence,
                provider: info.provider,
              };
            }
          });
          const to_agence = info_colis.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            if (info.agence !== agence_user) {
              return {
                id: id,
                colis: info.id,
                driver: req.body.driver,
                agence_to: info.agence,
                agence_from: agence_user,
              };
            }
          });

          if (to_provider.length !== 0) {
            console.log("here");

            await trx("retour_provider").insert(to_provider);
          }
          if (to_agence !== 0) {
            await trx("retour_agence").insert(to_agence);
          }
          res.status(200).json({
            message: "Successfully updated delivery",
            status: 200,
            data: to_remove,
          });
        } else {
          res.status(200).json({
            message: "can't update",
            status: 200,
            data: to_remove,
          });
        }
      })

      .catch(function (err) {
        console.error(err);
        next(new createHttpError.InternalServerError("Internal server error"));
      });
  } catch (error) {
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});

/**
 * @swagger
 * /retour/provider/pending/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) pending retour status=0 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/provider/pending/to_provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    const user = req.userId;
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 0)
        .andWhere("provider", "=", user)

        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 0)
          .andWhere("provider", "=", user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/provider/ongoing/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) ongoing retour status=1.
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/provider/ongoing/to_provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    const user = req.userId;
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

      const coliss = (await app.db.table("colis").where("etat_final", "=", 0))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 1)
        .andWhere("provider", "=", user)

        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 1)
          .andWhere("provider", "=", user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/provider/done/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) done retour status=2.
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/provider/done/to_provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    const user = req.userId;
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 2)
        .andWhere("provider", "=", user)

        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 2)
          .andWhere("provider", "=", user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/pending/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) pending retour status=0 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/pending/to_provider",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 0)
        .andWhere("agence_provider", "=", agence_user)

        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 0)
          .andWhere("agence_provider", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/ongoing/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) ongoing retour status=1.
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/ongoing/to_provider",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 1)
        .andWhere("agence_provider", "=", agence_user)

        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 1)
          .andWhere("agence_provider", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/done/to_provider:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) done retour status=2.
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/done/to_provider",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_provider")
        .count("* as count")
        .where("retour_status", "=", 2)
        .andWhere("agence_provider", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("retour_provider ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 2)
          .andWhere("agence_provider", "=", agence_user)
      ).map((e) => ({
        ...e,
        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/pending/to_agence_to:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) pending retour status=0 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/pending/to_agence_to",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 0)
        .andWhere("agence_to", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 0)
          .andWhere("agence_to", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/ongoing/to_agence_to:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) pending retour status=1 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/ongoing/to_agence_to",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 1)

        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 1)
          .andWhere("agence_to", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/done/to_agence_to:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) done retour status=2 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/done/to_agence_to",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 2)
        .andWhere("agence_to", "=", agence_user)
        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 2)
          .andWhere("agence_to", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/pending/to_agence_from:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) pending retour status=0 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/pending/to_agence_from",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 0)
        .andWhere("agence_from", "=", agence_user)

        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 0)
          .andWhere("agence_from", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/ongoing/to_agence_from:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) ongoing retour status=1 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/ongoing/to_agence_from",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 1)
        .andWhere("agence_from", "=", agence_user)

        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 1)
          .andWhere("agence_from", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /retour/done/to_agence_from:
 *   get:
 *     summary: Retrieve a list of  retour (cancel) done retour status=2 .
 *     description:  Retrieve a list of  cancel delivery.
 *     tags:
 *       - retour_delivery
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
 *         decription: colis fetched .
 *       400:
 *         description: colis not found .
 *
 */

app.get(
  "/retour/done/to_agence_from",
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

      const coliss = (await app.db.table("colis"))
        .map((e) => ({ ...e, provider: provider[e.provider] }))
        .reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const total = await app.db
        .table("retour_agence")
        .count("* as count")
        .where("retour_status", "=", 2)
        .andWhere("agence_from", "=", agence_user)

        .first();
      const delivery = (
        await app.db
          .table("retour_agence ")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("retour_status", "=", 2)
          .andWhere("agence_from", "=", agence_user)
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "colis for retour  not found  ",
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
 * /colis/from_retour_provisoire/to_retour_final/{id}:
 *   put:
 *     summary: anomaly colis from replanification to retour final
 *     tags:
 *       -  retour_delivery  
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID colis.
 *         schema:
 *           type: string 
 *     content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
                 
 
 *     responses:
 *       201:
 *         description: retour colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 */
app.put(
  "/dispatch/colis/to_retour_final/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    console.log(req.params.id)
    try {
      app.db
        .transaction(async (trx) => {
          const [num_tentative_setting] = await app
            .db("setting")
            .select("*")
            .pluck("nb_tentative");
          if (req.params.id) {
            console.log(req.params.id)
            const [colis] = await app
              .db("delivery")
              .select("colis")
              .where("id", "=", req.params.id);
            const [id_delivery] = await trx
              .table("delivery")
              .select("id")
              .where("colis", "=", req.params.id);
            await trx
              .table("delivery")
              .update({
                status_anomaly: 1,
                status_delivery: 2,
                updated_at: new Date(),
                tentatif: num_tentative_setting,
                check_replanification: 0,
              })
              .where("id", "=", id_delivery.id);
            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: id_delivery.id,
              colis: colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "changer retour prevesoir vers retour final",
            });
          }

        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated retour",
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
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /colis/from_retour_final/to_retour_provisoire/{id}:
 *   put:
 *     summary: anomaly colis from replanification to retour final
 *     tags:
 *       -  retour_delivery  
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID colis.
 *         schema:
 *           type: string 
 *     content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:
 *                   type: string
 *                   description: the driver  ID
 *                   example: 3C5666A0-D599-11EB-8108-F3684AFB6E64
                 
 
 *     responses:
 *       201:
 *         description: retour colis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 */
app.put(
  "/colis/from_retour_final/to_retour_provisoire/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {


          if (req.params.id) {
            [colis] = await app
              .db("delivery")
              .select("colis")
              .where("id", "=", req.params.id);
            const [id_delivery] = await trx
              .table("delivery")
              .select("id")
              .where("colis", "=", req.params.id);
            await trx
              .table("delivery")
              .update({
                status_anomaly: 0,
                status_delivery: 0,
                updated_at: new Date(),
                tentatif: 0,
                driver: req.body.driver,
                check_replanification: 1,
              })
              .where("id", "=", id_delivery.id);
            await trx.table("colis_history").insert({
              id: uuid.v1().toLocaleUpperCase(),
              action: id_delivery.id,
              colis: colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: "changer retour final  vers retour provisoir",
            });
          }

        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated retour",
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
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /provider/delivery/reschedule/list:
 *   get:
 *     summary: Retrieve a list of  reschedule delivery for provider assign .
 *     description:  Retrieve a list of  reschedule delivery.
 *     tags:
 *       - reschedule_delivery
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
  "/provider/delivery/reschedule/list",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driver = (
        await app.db.table("driver as d").join("app_user as u ", "u.id", "d.id")
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
      const id_colis = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", req.userId);

      const agence_user = req.agence;

      const coliss = (
        await app.db.table("colis").where("etat_final", "=", 0)
      ).reduce((a, e) => ({ ...a, [e.id]: e }), {});

      const orderByColumn = req.query.order_by_column || "created_at";
      const orderByDirection = req.query.order_by_direction || "desc";
      let reqData = req.query;
      let pagination = {};
      let per_page = reqData.per_page || 10;
      let page = reqData.current_page || 1;
      if (page < 1) page = 1;
      var offset = (page - 1) * per_page;
      const [num_tentative_setting] = await app
        .db("setting")
        .select("*")
        .pluck("nb_tentative");
      const total = await app.db
        .table("delivery")
        .count("* as count")
        .where("status_anomaly", "=", 1)
        .andWhere("status_delivery", "=", 2)
        .andWhere("tentatif", "!=", num_tentative_setting)
        .where("check_replanification", "=", 0)
        .andWhere(
          "colis",
          "IN",
          id_colis.map((el) => el.id)
        )
        .first();
      const delivery = (
        await app.db
          .table("delivery")
          .select("*")
          .orderBy(orderByColumn, orderByDirection)
          .offset(offset)
          .limit(per_page)
          .where("status_anomaly", "=", 1)
          .andWhere("status_delivery", "=", 2)
          .andWhere("tentatif", "!=", num_tentative_setting)
          .where("check_replanification", "=", 0)
          .andWhere(
            "colis",
            "IN",
            id_colis.map((el) => el.id)
          )
      ).map((e) => ({
        ...e,

        driver: driver[e.driver],
        colis: coliss[e.colis],
      }));
      var count = total.count;
      var rows = delivery;
      pagination.total = count;
      pagination.per_page = per_page;
      pagination.offset = offset;
      pagination.to = offset + rows.length;
      pagination.last_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.from = offset;
      pagination.data = rows;
      if (delivery.length === 0) {
        return res.json({
          message: "Reshedule colis not found",
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
