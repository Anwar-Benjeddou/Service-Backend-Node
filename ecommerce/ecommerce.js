const app = require("../index");
const uuid = require("uuid");
const authJwt = require("../Authentification/middleware/authJwt");
const QRCode = require('qrcode')


app.get("/ecommerce", (req,res)=>{
console.log(req.body)
res.json({"hello":" ecommerce"})

})