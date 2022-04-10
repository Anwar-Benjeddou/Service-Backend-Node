const schedule = require("node-schedule");
const app = require("../../index");

/**
 * @swagger
 * /backup/pickup:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

 app.get("/backup/pickup",  async (req, res, next) => {
    try {
        app.db.transaction(async (trx) => {
            const colis = await trx
              .table("colis")
              .select("id")
              .where("etat_final", "=", 1);
            const pickups = await trx
              .table("pickup")
              .select("*")
              .where(
                "colis",
                "IN",
                colis.map((e) => e.id)
              );
        
            await trx.batchInsert("pickup_bk",pickups,1000);
        
            await trx
              .table("pickup")
              .where(
                "colis",
                "IN",
                colis.map((colisElem) => colisElem.id)
              )
              .del().then(()=>{
                  res.send ("done!");


              })
          });
        
    } catch (error) {
     
      res.send("Internal Server Error")
    }
  });

  /**
 * @swagger
 * /backup/delivery:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

 app.get("/backup/delivery",  async (req, res, next) => {
    try {
        app.db.transaction(async (trx) => {
            const colis = await trx
              .table("colis")
              .select("id")
              .where("etat_final", "=", 1);
            const deliverys = await trx
              .table("delivery")
              .select("*")
              .where(
                "colis",
                "IN",
                colis.map((e) => e.id)
              );
        
            await trx.batchInsert("delivery_bk",deliverys,1000);
        
            await trx
              .table("delivery")
              .where(
                "colis",
                "IN",
                colis.map((colisElem) => colisElem.id)
              )
              .del().then(()=>{
                  res.send ("done!");


              })
          });
        
        
    } catch (error) {
     
      res.send("Internal Server Error")
    }
  });
  /**
 * @swagger
 * /backup/console:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

 app.get("/backup/console",  async (req, res, next) => {
    try {
        app.db.transaction(async (trx) => {
            const colis = await trx
              .table("colis")
              .select("id")
              .where("etat_final", "=", 1);
            const consoles = await trx
              .table("console")
              .select("*")
              .where(
                "colis",
                "IN",
                colis.map((e) => e.id)
              );
        
            await trx.batchInsert("console_bk",consoles,1000);
        
            await trx
              .table("console")
              .where(
                "colis",
                "IN",
                colis.map((colisElem) => colisElem.id)
              )
              .del().then(()=>{
                  res.send ("done!");


              })
          });
        
         
    } catch (error) {
    
      res.send("Internal Server Error")
    }
  });
  /**
 * @swagger
 * /backup/history:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

 app.get("/backup/history",  async (req, res, next) => {
    try {
     await   app.db.transaction(async (trx) => {
            const colis = await trx
              .table("colis")
              .select("id")
              .where("etat_final", "=", 1);
            const colis_histories = await trx
              .table("colis_history")
              .select("*")
              .where(
                "colis",
                "IN",
                colis.map((e) => e.id)
              );
              await trx.batchInsert("colis_history_bk",colis_histories,1000);
            
        
            await trx
              .table("colis_history")
              .where(
                "colis",
                "IN",
                colis.map((colisElem) => colisElem.id)
              )
              .del().then(()=>{
                  res.send ("done!");


              })
          });
        
         
    } catch (error) {
     
     res.send("Internal Server Error")
    }
  });

    /**
 * @swagger
 * /backup/retour/agence:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

 app.get("/backup/retour/agence",  async (req, res, next) => {
  try {
   await   app.db.transaction(async (trx) => {
          const colis = await trx
            .table("colis")
            .select("id")
            .where("etat_final", "=", 1);
          const colis_histories = await trx
            .table("retour_agence")
            .select("*")
            .where(
              "colis",
              "IN",
              colis.map((e) => e.id)
            );
            await trx.batchInsert("retour_agence_bk",colis_histories,1000);
          
      
          await trx
            .table("retour_agence")
            .where(
              "colis",
              "IN",
              colis.map((colisElem) => colisElem.id)
            )
            .del().then(()=>{
                res.send ("done!");


            })
        });
      
       
  } catch (error) {
   
   res.send("Internal Server Error")
  }
});
  /**
 * @swagger
 * /backup/retour/provider:
 *   get:
 *     summary: shedule evry week
 *     description:  .
 *     tags:
 *       - zone
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 
 *       500:
 *         description : Internal server
 */

   app.get("/backup/retour/provider",  async (req, res, next) => {
    try {
     await   app.db.transaction(async (trx) => {
            const colis = await trx
              .table("colis")
              .select("id")
              .where("etat_final", "=", 1);
            const colis_histories = await trx
              .table("retour_provider")
              .select("*")
              .where(
                "colis",
                "IN",
                colis.map((e) => e.id)
              );
              await trx.batchInsert("retour_provider_bk",colis_histories,1000);
            console.log
        
            await trx
              .table("retour_provider")
              .where(
                "colis",
                "IN",
                colis.map((colisElem) => colisElem.id)
              )
              .del().then(()=>{
                  res.send ("done!");
  
  
              })
          });
        
         
    } catch (error) {
     
     res.send("Internal Server Error")
    }
  });