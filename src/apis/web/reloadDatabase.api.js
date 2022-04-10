// const app = require("../../../index");
// const createHttpError = require("http-errors");
// app.get("/reload/console", async (req, res, next) => {
//     try {
//       await app.db
//         .table("console")
//       //  .update({ check_magasinier_to:1, check_magasinier_from:1 , status_console_Delivery:1,status_console:2 , updated_at: new Date() })
//         .update({ check_magasinier_to:1, check_magasinier_from:1 , updated_at: new Date() })
//         .then(() => {
         
//           res.status(200).json({
//             message: "Successfully updated",
//             status: 200,
//             data: req.body,
//           });
//         });
//     } catch (error) {
//       next(new createHttpError.InternalServerError(error));
//     }
//   });

//       //  .update({ check_magasinier_to:1, check_magasinier_from:1 , status_console_Delivery:1,status_console:2 , updated_at: new Date() })

const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");

app.get("/reload/console", async (req, res, next) => {
    try {
      await app.db
        .table("console")
        .update({ check_magasinier_to:1, check_magasinier_from:1 , status_console_Delivery:1,status_console:2 , updated_at: new Date() })
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
  });
  app.get("/reload/retour/agence", async (req, res, next) => {
    try {
      await app.db
        .table("retour_agence")
        .update({ retour_status:2, })
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
  });



  app.get("/reload/colis", async (req, res, next) => {


    try {
      let colis= await app.db ("colis").select("*").pluck("id");

       colis.map(async(el) => {
       let code= "CODE-" + Math.floor(1000 + Math.random() * 9000)
       await app.db("colis")
       .update( { code: code
       }).where("id", "=", el)
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
  
  
  app.get("/reload/delivery", async (req, res, next) => {
    try {
      await app.db("delivery")
            .update( {
              check_retour: 1,
              date_check_retour: new Date(),
              updated_at: new Date(),
            })

            .where("status_delivery", "=", 2)
            .andWhere("status_anomaly", "=", 1).then(() => {
         
          res.status(200).json({
            message: "Successfully updated",
            status: 200,
            data: req.body,
          });
        });
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  });
  app.get("/reload/delivery/ongoing", async (req, res, next) => {
    try {
      await app.db("delivery")
            .update( {
              check_magasinier: 1,

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
  });
  app.get("/reload/colis/final/payement", async (req, res, next) => {
    try {
      const colis = await app.db("facture").select("colis").where("payment_status_provider", "=", 1)
      await app.db("colis")
            .update( {
              etat_final: 1,

            }).where("id","IN", colis.map(el=>el.colis))
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
  });
  app.get("/reload/password/all", async (req, res, next) => {
    try {
      await app.db("app_user")
            .update( {
              password: "tat",

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
  });

  app.get("/pickupchec/maga", async (req, res, next) => {
    try {
      await app.db("app_user")
            .update( {
              password: "appd",

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
  });

  app.get("/reload/retour_provider/toplan", async (req, res, next) => {
    try {
      await app.db("retour_provider")
            .update( {
              retour_status: 0,

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
  });


  app.get("/test_delete/history",/*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
  
      if (true) {
        await app.db("colis_history")
          .delete()
          .where("updated_at", "<","2022-02-15 08:08:21.342235+01" )
          .then(() => {
            console.log("here")
          })
  
        res.json({
          message: "invoice deleted",
          status: 200,
          data: ""
  
        })
  
  
      }
  
      else {
        res.json({
          message: "invoice deleted",
          status: 200,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  });
  

  app.get("/test_delete/pickup/history",/*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
  
      if (true) {
        await app.db("pickup")
          .delete()
          .where("created_at", "<","2022-02-20 08:08:21.342235+01" )
          .then(() => {
            console.log("here")
          })
  
        res.json({
          message: "invoice deleted",
          status: 200,
          data: ""
  
        })
  
  
      }
  
      else {
        res.json({
          message: "invoice deleted",
          status: 200,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  });
  

  app.get("/test_delete/deliveryy/history",/*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
  
      if (true) {
        await app.db("delivery")
          .delete()
          .where("created_at", "<","2022-01-29 08:08:21.342235+01" )
          .andWhere("etat_payment", "=", 1)
          .then(() => {
            console.log("here")
          })
  
        res.json({
          message: "invoice deleted",
          status: 200,
          data: ""
  
        })
  
  
      }
  
      else {
        res.json({
          message: "invoice deleted",
          status: 200,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  });
  app.get("/test_delete/deliveryy/histor/ooy",/*  [authJwt.verifyToken], */ async (req, res, next) => {
    try {
  
      if (true) {
        await app.db("delivery")
          .delete()
          .where("created_at", "<","2022-01-29 08:08:21.342235+01" )
          .andWhere("status_delivery", "=", 3)
          .where("status_anomaly", "=", 1)
          .where("check_replanification", "=", 1)
          .then(() => {
            console.log("here")
          })
  
        res.json({
          message: "invoice deleted",
          status: 200,
          data: ""
  
        })
  
  
      }
  
      else {
        res.json({
          message: "invoice deleted",
          status: 200,
          data: {},
        });
      }
    } catch (error) {
      console.log(error);
      next(new createHttpError.BadRequest("Bad Request"));
    }
  });
  
  
    app.get("/spp/reload/colis", async (req, res, next) => {
    try {
      const colis = await app.db("retour_provider").select("colis")
      console.log(colis)
      await app.db("colis")
            .update( {
              etat_final: 1,

            }).where("id","IN", colis.map(el=>el.colis))
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
  });



  app.get("/reload/colis/map/historis", async (req, res, next) => {


    try {
      let listmap= await app.db ("location_driver").select("*").pluck("id");
      var colors = ["Pickup","checkPickup","transfert","stock","chek transfert","Livraison", "entré STock","Agence EXCHANGE", "Retour Colis", "Replanification Retour"];
      var randColor = colors[Math.floor(Math.random() * colors.length)];
      listmap.map(async(el) => {
       
       await app.db("location_driver")
       .update( { actions: colors[Math.floor(Math.random() * colors.length)]
       }).where("id", "=", el)
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

  app.get("/reloazd/colis/map/cosli", async (req, res, next) => {


    try {
      // await app.db("location_colis")
      // .delete()
     
      let listmap= [ "28f1f741-8e40-11ec-bf35-47b5af260e3f", "877727c0-94b4-11ec-a71c-87509895f921", "854c88c1-9476-11ec-a71c-87509895f921", "20d1e461-918f-11ec-bf35-47b5af260e3f", "e11889e1-916c-11ec-bf35-47b5af260e3f", "8bda4f41-8fdc-11ec-bf35-47b5af260e3f", "3d268381-8f07-11ec-bf35-47b5af260e3f", "d6612441-8e6e-11ec-bf35-47b5af260e3f", "d5c19731-851e-11ec-b848-07b5b30d31cc" ]
    
       var colors = ["Pickup","checkPickup","transfert","stock","chek transfert","Livraison", "entré STock","Agence EXCHANGE", "Retour Colis", "Replanification Retour"];
    
      listmap.map(async(el) => {
       
       await app.db("location_colis")
       .insert( {id:uuid.v1().toLocaleUpperCase(),colis:el, actions: colors[Math.floor(Math.random() * colors.length) ], colis:listmap[Math.floor(Math.random() * colors.length)] , latitude:Math.random()+35,longitude:Math.random()+10
       })
      });
 
      listmap.map(async(el) => {
       
        await app.db("location_colis")
        .insert( {id:uuid.v1().toLocaleUpperCase(),colis:el, actions: colors[Math.floor(Math.random() * colors.length) ], colis:listmap[Math.floor(Math.random() * colors.length)] , latitude:Math.random()+35,longitude:Math.random()+10
        })
       });
         
      //     res.status(200).json({
      //       message: "Successfully updated",
      //       status: 200,
      //       data: req.body,
      //     });
      
    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  });

  app.get("/deletfrom/history", async (req, res, next) => {


    try {
      let coliss= await app.db ("colis").select("*").where("etat_final","=",1).pluck("id");

      await app.db("colis_history")
      .delete()
      .where(
        "colis",
        "IN",
        coliss
      );

    } catch (error) {
      next(new createHttpError.InternalServerError(error));
    }
  });

  app.get("/relod/backup/retour/provider",  async (req, res, next) => {
    try {
     await   app.db.transaction(async (trx) => {
            const colis_histories = await trx
              .table("retour_provider")
              .select("*")

              await trx.batchInsert("retour_provider_bk",colis_histories,1000);
            console.log
        
            await trx
              .table("retour_provider")
              .del().then(()=>{
                  res.send ("done!");
  
  
              })
          });
        
         
    } catch (error) {
     
     res.send("Internal Server Error")
    }
  });

  app.get("/reload/backup/retour/agence",  async (req, res, next) => {
    try {
     await   app.db.transaction(async (trx) => {
          
            const colis_histories = await trx
              .table("retour_agence")
              .select("*")
            
              await trx.batchInsert("retour_agence_bk",colis_histories,1000);
            
        
            await trx
              .table("retour_agence")
              .del().then(()=>{
                  res.send ("done!");
  
  
              })
          });
        
         
    } catch (error) {
     
     res.send("Internal Server Error")
    }
  });