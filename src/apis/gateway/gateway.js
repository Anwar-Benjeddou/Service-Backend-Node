const app = require("../../../index");
const createHttpError = require("http-errors");
const uuid = require("uuid");
const authJwt = require("../../middlewares/auth");

app.get(
    "/magasin/beecon/gateway/test",
    async (req, res, next) => {
      try {
        console.log(req.query)
        res.status(200).json({
            message: "Successfully updated pickup",
            status: 200,
            data: "req.body,"
          });
      } catch (error) {
        next(new createHttpError.BadRequest("Invalid values to create a colis."));
      }
    }
  );

  app.get(
    "/beecon/colis/:id",
    async (req, res, next) => {
      try {
        await app.db
          .transaction(async (trx) => {
               console.log(req.params.id)
              await trx
                .table("colis")
                .update({
                code:req.params.id
                })
               
  
             
          })
          .then(function () {
            console.log("Transaction complete.");
            res.status(200).json({
              message: "Successfully updated pickup",
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
  app.get(
    "/beecon/colis/:id",
    async (req, res, next) => {
      try {
        await app.db
          .transaction(async (trx) => {
               console.log(req.params.id)
              await trx
                .table("colis")
                .update({
                code:req.params.id
                })
               
  
             
          })
          .then(function () {
            console.log("Transaction complete.");
            res.status(200).json({
              message: "Successfully updated pickup",
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
  