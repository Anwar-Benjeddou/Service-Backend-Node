
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "LOGISTIC API",
    version: "1.0.0",
    description: "Document for logistic plateform",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "H.Oumaima",
      url: "oumaima.hedhli4@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/apis/web/*.js", "./src/apis/mobile/*.js", "./src/apis/statistic/*.js"],
};



const swaggerSpec = swaggerJSDoc(options);
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const env = require("./env");
const db = require("./database");

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.get("/renderfile", /* [authJwt.verifyToken],  */async (req, res, next) => {
  try
    {
    res.sendFile(path.join(__dirname+'/views/index.html'));
    } 
  catch (error) {
    console.log(error)
   
  }
});

app.get('/donwloadfile', (req, res) => {
  console.log(__dirname)
 // res.contentType("application/csv");
  res.download(__dirname + '/public/formulaire.xlsx', "formulaire.xlsx", (err) => {
    if (err) console.log(err);
});
 // res.status(200).sendFile(__dirname + '/public/formulaire.xlsx');
});
app.get('/donwload/apk/driver/:apk', (req, res) => {
  console.log(__dirname)
 // res.contentType("application/csv");
  res.download(__dirname + '/public/apk/'+req.params.apk, "version21.apk", (err) => {

    if (err) console.log(err);
});
 // res.status(200).sendFile(__dirname + '/public/formulaire.xlsx');
});
app.db = db;

module.exports = app;

require("./contributor-1");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log("listening on port " + env.port);
app.listen(env.port || 80);
