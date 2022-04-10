const app = require("../../../index");
const createHttpError = require("http-errors");
const authJwt = require("../../middlewares/auth");
const uuid = require("uuid");
const _ = require("lodash");

/**
 * @swagger
 * /retour/do_check:
 *   put:
 *     summary: user check retour
 *     tags:
 *       - mobile_retour_check
 *     requestBody:
 *       name: Optional description in *Markdown*
 *
 *       decription: Optional description in *Markdown*
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 
 *             colis:
 *                type: array
 *                example:  []
 *
 *     responses:
 *       201:
 *         description: check console
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: array
 *                       example:  [ ]
 */
app.put("/retour/do_check", [authJwt.verifyToken], async (req, res, next) => {
  try {
    let { colis } = req.body;
    colis = _.sortedUniq(colis);
    app.db
      .transaction(async (trx) => {
        const anomalies = await trx
          .table("anomaly_delivery as c")
          .select("*")
          .where(
            "c.colis",
            "IN",
            colis.map((e) => e)
          );
        const data = anomalies.map(() => {
          return {
            magasinier_to: req.userId,
            check_magasinier_to: 1,
            date_check_magasinier_to: new Date(),
            updated_at: new Date(),
          };
        });
        const history = anomalies.map((anomaly) => {
          return {
            id: uuid.v1().toLocaleUpperCase(),
            action: anomaly.id,
            colis: anomaly.colis,
            actionneurs: req.userId,
            agence: req.agence,
            event: " check retour sortie",
            vu_provider: 1,
          };
        });
        let i = 0;
        await trx("console")
          .update(data[i++])
          .where(
            "id",
            "IN",
            anomalies.map((anomaly) => anomaly.id)
          );
        await trx("colis_history").insert(history);
      })
      .then(function () {
        res.status(200).json({
          message: "Successfully updated console",
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
    next(new createHttpError.InternalServerError("Internal Server Error"));
  }
});

/**
 * @swagger
 * /magasinier/retour/do_check:
 *   put:
 *     summary: user check retour
 *     tags:
 *       - mobile_retour_check
 *     requestBody:
 *       name: Optional description in *Markdown*
 *
 *       decription: Optional description in *Markdown*
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 
 *             colis:
 *                type: array
 *                example:  []
 *
 *     responses:
 *       201:
 *         description: check console
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     colis:
 *                       type: array
 *                       example:  [ ]
 */
app.put(
  "/magasinier/retour/do_check",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      let { colis } = req.body;
      colis = _.sortedUniq(colis);
      app.db
        .transaction(async (trx) => {
          const anomalies = await trx
            .table("anomaly_delivery as c")
            .select("*")
            .where(
              "c.colis",
              "IN",
              colis.map((e) => e)
            );
          const data = colis.map(() => {
            return {
              check_retour: 1,
              date_check_retour: new Date(),
              updated_at: new Date(),
            };
          });
          const id_delivery = await trx("delivery")
            .select("id")
            .where(
              "colis",
              "IN",
              colis.map((el) => el)
            );

          let i = 0;
          await trx("delivery")
            .update(data[i])
            .where(
              "id",
              "IN",
              id_delivery.map((el) => el.id)
            )
            .andWhere("status_delivery", "=", 2)
            .andWhere("status_anomaly", "=", 1);

          const history = anomalies.map((anomaly) => {
            return {
              id: uuid.v1().toLocaleUpperCase(),
              action: anomaly.id,
              colis: anomaly.colis,
              actionneurs: req.userId,
              agence: req.agence,
              event: " check retour entrée",
              vu_provider: 1,
            };
          });

          await trx("colis_history").insert(history);
        })
        .then(function () {
          res.status(200).json({
            message: "Successfully updated ",
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
      console.log(error);
      next(new createHttpError.InternalServerError("Internal Server Error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/retour/{id}:
 *   get:
 *     summary: Retrieve a list of retour for each user used in provider to provider.
 *     description: list of retour finalized for each user.
 *     tags:
 *       - anomaly
 *     parameters:
 *       - in: query
 *         name: status_retour
 *         schema:
 *           type: integer
 *           description: status anomaly 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID driver.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: anomaly fetched .
 *       400:
 *         description: anomaly not found .
 *
 */

app.get(
  "/admin/manifest/retour/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      console.log("hfgsq");
      const providerId = req.params.id;

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
      const colis = (await app.db.table("colis").where("provider","=",providerId)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      if (providerId) {
        let anomaly;
        if (req.query.status_retour == 1 || req.query.status_retour == 0) {
          anomaly = (
            await app.db
              .table("retour_provider")
              .select("*")
              .andWhere("retour_status", "=", req.query.status_retour)
              .where("provider", "=", providerId)
              .andWhere("retour_status", "=", req.query.status_retour)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        } else {
          anomaly = (
            await app.db
              .table("retour_provider")
              .select("*")
              .where("provider", "=", providerId)
              .andWhere("retour_status", "=", 0)
              .orWhere("retour_status", "=", 1)
              .where("provider", "=", providerId)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        }
        if (anomaly.length === 0) {
          return res.json({
            message: "retour   not found  ",
            status: 200,
            data: anomaly,
          });
        }
        res.json({
          message: "retour  fetched",
          status: 200,
          data: anomaly,
        });
      } else {
        res.json({
          message: "entry driver",
          status: 400,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/driver/retour/{id}:
 *   get:
 *     summary: Retrieve a list of retour for each driver to provider .
 *     description: list of retour finalized for each user.
 *     tags:
 *       - anomaly
 *     parameters:
 *       - in: query
 *         name: status_retour
 *         schema:
 *           type: integer
 *           description: status anomaly 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID driver.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: anomaly fetched .
 *       400:
 *         description: anomaly not found .
 *
 */

app.get(
  "/admin/manifest/driver/retour/:id",
  /*   [authJwt.verifyToken], */
  async (req, res, next) => {
    try {
      const driverId = req.params.id;
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
      const colis = (await app.db.table("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      if (driverId) {
        let anomaly;
        if (req.query.status_retour == 1 || req.query.status_retour == 0) {
          anomaly = (
            await app.db
              .table("retour_provider")
              .select("*")
              .andWhere("retour_status", "=", req.query.status_retour)
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", req.query.status_retour)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        } else {
          anomaly = (
            await app.db
              .table("retour_provider")
              .select("*")
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", 0)
              .orWhere("retour_status", "=", 1)
              .where("driver", "=", driverId)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        }
        console.log(anomaly.length);
        if (anomaly.length === 0) {
          return res.json({
            message: "retour   not found  ",
            status: 200,
            data: anomaly,
          });
        }
        res.json({
          message: "retour  fetched",
          status: 200,
          data: anomaly,
        });
      } else {
        res.json({
          message: "entry driver",
          status: 400,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/driver/retour/interagence/{id}:
 *   get:
 *     summary: Retrieve a list of retour for each driver to agence .
 *     description: list of retour finalized for each user.
 *     tags:
 *       - anomaly
 *     parameters:
 *       - in: query
 *         name: status_retour
 *         schema:
 *           type: integer
 *           description: status anomaly 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID driver.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: anomaly fetched .
 *       400:
 *         description: anomaly not found .
 *
 */

app.get(
  "/admin/manifest/driver/retour/interagence/:id",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driverId = req.params.id;
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
      const colis = (await app.db.table("colis")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );

      if (driverId) {
        let anomaly;
        if (req.query.status_retour == 1 || req.query.status_retour == 0) {
          anomaly = (
            await app.db
              .table("retour_agence")
              .select("*")
              .andWhere("retour_status", "=", req.query.status_retour)
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", req.query.status_retour)
              .andWhere("agence_from", "=", req.agence)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        } else {
          anomaly = (
            await app.db
              .table("retour_agence")
              .select("*")
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", 0)
              .andWhere("agence_from", "=", req.agence)
              .orWhere("retour_status", "=", 1)
              .where("driver", "=", driverId)
              .andWhere("agence_from", "=", req.agence)
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        }
        console.log(anomaly.length);
        if (anomaly.length === 0) {
          return res.json({
            message: "retour   not found  ",
            status: 200,
            data: anomaly,
          });
        }
        res.json({
          message: "retour  fetched",
          status: 200,
          data: anomaly,
        });
      } else {
        res.json({
          message: "entry driver",
          status: 400,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /admin/manifest/driver/provider/retour/interagence/{id}/{idprovider}:
 *   get:
 *     summary: Retrieve a list of retour for each driver and provider to agence .
 *     description: list of retour finalized for each user.
 *     tags:
 *       - anomaly
 *     parameters:
 *       - in: query
 *         name: status_retour
 *         schema:
 *           type: integer
 *           description: status anomaly 0 || 1 || 2
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID driver.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idprovider
 *         required: true
 *         description: String ID provider.
 *         schema:
 *           type: string
 *
 *
 *     responses:
 *       200:
 *         decription: anomaly fetched .
 *       400:
 *         description: anomaly not found .
 *
 */

app.get(
  "/admin/manifest/driver/provider/retour/interagence/:id/:idprovider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const driverId = req.params.id;
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
      const colis = (await app.db.table("colis").where('etat_final', "=", 0)).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const agence = (await app.db.table("agence")).reduce(
        (a, e) => ({ ...a, [e.id]: e }),
        {}
      );
      const colisid = await app.db
        .table("colis")
        .select("id")
        .where("provider", "=", req.params.idprovider).where('etat_final', "=", 0)
        if (driverId && req.params.idprovider) {
        let anomaly;
        if (req.query.status_retour == 1 || req.query.status_retour == 0) {
          anomaly = (
            await app.db
              .table("retour_agence")
              .select("*")
              .andWhere("retour_status", "=", req.query.status_retour)
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", req.query.status_retour)
              .andWhere("agence_from", "=", req.agence)
              .andWhere(
                "colis",
                "IN",
                colisid.map((el) => el.id)
              )
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        } else {
          anomaly = (
            await app.db
              .table("retour_agence")
              .select("*")
              .where("driver", "=", driverId)
              .andWhere("retour_status", "=", 0)
              .andWhere("agence_from","=",req.agence)
              .andWhere(
                "colis",
                "IN",
                colisid.map((el) => el.id)
              )

              .orWhere("retour_status", "=", 1)
              .where("driver", "=", driverId)
              .andWhere("agence_from","=",req.agence)
              .andWhere(
                "colis",
                "IN",
                colisid.map((el) => el.id)
              )
          ).map((e) => ({
            ...e,
            agence_provider: agence[e.agence_provider],
            colis: colis[e.colis],
            provider: provider[e.provider],
          }));
        }
        if (anomaly.length === 0) {
          return res.json({
            message: "retour   not found  ",
            status: 200,
            data: anomaly,
          });
        }
        res.json({
          message: "retour  fetched",
          status: 200,
          data: anomaly,
        });
      } else {
        res.json({
          message: "entry driver",
          status: 400,
          data: [],
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);


/**
 * @swagger
 * /retour/to_ongoing/provider:
 *   put:
 *     summary: update status retour to ongoing (status=1).
 *     tags:
 *       - mobile_return_driver
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
 *             colis:
 *               type: array
 *               example:  [ ]
 
 *     responses:
 *       201:
 *         description: delivery ongoing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties: 
 
 *                     colis:
 *                       type: array
 *                       description: The colis's IDs.
 *                       example:  []

 */
 app.put(
  "/retour/validate/provider",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      app.db
        .transaction(async (trx) => {
          const { colis } = req.body;
          const retour = await trx
            .table("retour_provider")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e)
            );

          const update_retour = retour.map(() => {
            return {
              retour_status: 2,
              updated_at: new Date(),
            };
          });

          let compt = 0;
          await trx
            .table("retour_provider")
            .update(update_retour[compt++])
            .where(
              "id",
              "IN",
              retour.map((colis) => colis.id)
            );
          const history = retour.map((info) => {
            const id = uuid.v1().toLocaleUpperCase();
            return {
              id: id,
              action: info.id,
              colis: info.colis,
              actionneurs: req.userId,
              agence:req.agence,
              event: "retour vers provider en cours",
            };
          });
          await trx.table("colis_history").insert(history);
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
