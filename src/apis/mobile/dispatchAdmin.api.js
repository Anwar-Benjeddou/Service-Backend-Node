const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

const _ = require("lodash");
/**
 * @swagger
 * /mobile/console/add:
 *   post:
 *     summary: Create new console with mobile app.
 *     tags:
 *       - mobile_admin_dispatch
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              agence_to:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The exchange values.
 *                example: ["2D3E0680-DA5F-11EB-99E7-97715BE0A51A", "0E3B3951-DA60-11EB-99E7-97715BE0A51A","2D3E0680-DA5F-11EB-99E7-97715BE0A51A" ]                             
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
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     agence_to:          # <!--- form field name
 *                       type: string
 *                       required: true
 *                       example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *                     colis:          # <!--- form field name
 *                       type: string
 *                       required: true
 *                       description: The exchange values.
 *                       example: ["2D3E0680-DA5F-11EB-99E7-97715BE0A51A", "0E3B3951-DA60-11EB-99E7-97715BE0A51A","2D3E0680-DA5F-11EB-99E7-97715BE0A51A" ]                             
 
 
*/
app.post(
  "/mobile/console/add",
  [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const user = req.userId;
      const agence_user = req.agence;
      let { driver, agence_to, colis } = req.body;
      app.db.transaction(async (trx) => {
        
        let colis_InAgence= await trx('colis').select("id").where(
          "id",
          "IN",
          colis.map((colisid) => colisid)
        )
        .andWhere("agence", "!=", agence_user)
        .orWhere("agence_transfert", "!=", agence_user)
        .andWhere(
          "id",
          "IN",
          colis.map((colisid) => colisid)
        )

        let pickup_done = await trx("pickup")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          )
          .andWhere("status_pickup", "!=", 2)
          .orWhere("check_magasinier", "=", 0)
          .andWhere(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          );

        let exist_InConsole = await trx("console")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          );
          let exist_InDelivery = await trx("delivery")
          .select("colis")
          .where(
            "colis",
            "IN",
            colis.map((colisid) => colisid)
          );
        let to_remove = _.unionBy(
          pickup_done,
          exist_InConsole,
          exist_InDelivery,
          colis_InAgence,
          "colis"
        ).map(el=>el.colis)
        
        
        const filtred = _.sortedUniq(colis).filter((el) => {
          return !to_remove.includes(el);
        });
        const dispatchExist={
          done_InPickup: pickup_done.map(el=>el.colis),
            exist_InConsole: exist_InConsole.map(el=>el.colis),
            exist_InDelivery: exist_InDelivery.map(el=>el.colis),
            colis_InAgence:colis_InAgence.map(el=>el.colis)
        }

        if (filtred.length > 0) {
          const [num_console_setting] = await trx
            .table("setting")
            .select("num_console", "id");
          const code =
            "Console-" + parseInt(num_console_setting.num_console) + 1;
          if (num_console_setting) {
            await trx
              .table("setting")
              .update({
                num_console: parseInt(num_console_setting.num_console) + 1,
              })
              .where("id", "=", num_console_setting.id);
          }

          const data = filtred.map((idcolis) => {
            const id = uuid.v1().toLocaleUpperCase(),
              console = {
                id: id,
                code: code,
                driver: driver,
                to_agence: agence_to,
                from_agence: agence_user,
                colis: idcolis,
                check_magasinier_to:1,
                check_magasinier_from:1
              },
              colis_history = {
                id: uuid.v1().toLocaleUpperCase(),
                action: id,
                colis: idcolis,
                actionneurs: user,
                agence: req.agence,
                event: "créer transfert",
                vu_provider: 1,
              };
            return { console, colis_history };
          });

          await trx("console")
            .select("colis")
            .where(
              "colis",
              "IN",
              data.map((d) => {
                return d.console.colis;
              })
            )
            .then(async (rows) => {
              if (rows.length === 0) {
                await trx("console").insert(
                  data.map((d) => {
                    return d.console;
                  })
                );
              }
            });

          await trx("colis_history")
            .insert(
              data.map((d) => {
                return d.colis_history;
              })
            )
            .whereNotIn(
              "action",
              "IN",
              data.map((d) => {
                return d.colis_history.action;
              })
            );

          const coliss = filtred.map(() => {
            return {
              status_delivery_exchange: 1,
              updated_at: new Date(),
              agence_transfert: agence_to,
            };
          });

          let i = 0;
          await trx("colis")
            .update(coliss[i++])
            .where(
              "id",
              "IN",
              filtred.map((colis) => colis)
            )
            .andWhere(" status_delivery_exchange", "=", 0);
            res.status(201).json({
            message: "Successfully created console",
            status: 200,
            data: dispatchExist,
          });
        } else {
          res.status(404).json({
            message: "colis  dispatch ou pickup non terminé / colis n'appartient pas votre agence",
            status: 404,
            data: dispatchExist,
          });
        }
      });
    } catch (error) {
      next(new createHttpError.InternalServerError("Internal server error"));
    }
  }
);

/**
 * @swagger
 * /mobile/delivery/add:
 *   post:
 *     summary: Create new delivery.
 *     tags:
 *       - mobile_admin_dispatch
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              driver:          # <!--- form field name
 *                type: string
 *                required: true
 *                example: 1005DCA0-DA5F-11EB-99E7-97715BE0A51A
 *              colis:          # <!--- form field name
 *                type: string
 *                required: true
 *                description: The colis values.
 *                example: [ ]
 *
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
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     driver:
 *                       type: string
 *                       description: The driver's id.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f
 *                     colis:
 *                       type: array
 *                       description: The customer's id.
 *                       example: []
 *
 */
app.post(
  "/mobile/delivery/add",
   [authJwt.verifyToken],
  async (req, res, next) => {
    try {
      const agence_user = req.agence;
      const user = req.userId;
      const { driver, colis } = req.body;

      app.db
        .transaction(async (trx) => {
          let colis_InAgence= await trx('colis').select("id").where(
            "id",
            "IN",
            colis.map((colisid) => colisid)
          )
          .andWhere("agence", "!=", agence_user)
          .orWhere("agence_transfert", "!=", agence_user)
          .andWhere(
            "id",
            "IN",
            colis.map((colisid) => colisid)
          )

          let pickup_done = await trx("pickup")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            .andWhere("status_pickup", "!=", 2)
            .orWhere("check_magasinier", "=", 0)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );

          let exist_InConsole = await trx("console")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid))
            .andWhere("status_console", "!=", 2)
            .orWhere("check_magasinier_to", "=", 0)
            .andWhere(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            )
            

          let exist_InDelivery = await trx("delivery")
            .select("colis")
            .where(
              "colis",
              "IN",
              colis.map((colisid) => colisid)
            );
          let to_remove = _.unionBy(
            pickup_done,
            exist_InConsole,
            exist_InDelivery,
            colis_InAgence,
            "colis"
          ).map(el=>el.colis)
          
          
          const filtred = _.sortedUniq(colis).filter((el) => {
            return !to_remove.includes(el);
          });
          const dispatchExist={
            done_InPickup: pickup_done.map(el=>el.colis),
              exist_InConsole: exist_InConsole.map(el=>el.colis),
              exist_InDelivery: exist_InDelivery.map(el=>el.colis),
              colis_InAgence:colis_InAgence.map(el=>el.id)
          }

          if (filtred.length > 0) {
           
            const colis1 = filtred.map(() => {
              return {
                status_console_Delivery: 1,
                updated_at: new Date(),

              };
            });
            const idconsoles = await app.db("console").select("id").where(
              "colis",
              "IN",
              filtred.map((colis) => colis)
            );
            let compt = 0;
            await trx("console")
              .update(colis1[compt++])
              .where(
                "id",
                "IN",
                idconsoles.map((console) => console.id)
              );




            const coliss = filtred.map(() => {
              return {
                status_delivery_exchange: 1,
                updated_at: new Date(),
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
            const data = filtred.map((idcolis) => {
              const id = uuid.v1().toLocaleUpperCase(),
                delivery = {
                  driver: driver,
                  colis: idcolis,
                  id: id,
                  code: "COLIS-" + Math.floor(1000 + Math.random() * 9000),
                  agence_exchange: agence_user,
                },
                colis_history = {
                  id: uuid.v1().toLocaleUpperCase(),
                  action: id,
                  colis: idcolis,
                  actionneurs: user,
                  agence: req.agence,
                  event: "créer livraison ",
                };
              return { delivery, colis_history };
            });
            await trx("delivery").insert(
              data.map((d) => {
                return d.delivery;
              })
            );

            await trx("colis_history").insert(
              data.map((d) => {
                return d.colis_history;
              })
            );

            res.status(201).json({
              message: "Successfully created delivery",
              status: 200,
              data: dispatchExist,
            });
          } else {
            
            res.status(404).json({
              message:
                "colis  dispatch ou pickup non terminé / colis n'appartient pas votre agence ",
              status: 440,
              data: dispatchExist,
            });
          }
        })

        .then(() => { })
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
