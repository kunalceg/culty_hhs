var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
let sql = require("mssql");
var cors = require("cors");
var router = express.Router();
var admin = require("firebase-admin");
var path = require("path");

("use strict");
const fs = require("fs");

const PORT = process.env.PORT || 8080;
let corsSettings = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  "Access-Control-Allow-Origin": "*",
  optionsSuccessStatus: 204,
};

var app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsSettings));

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
//Import all routes from routes directory
// have base url as /api/v1/

app.use("/api/v1/carousel", require("./routes/carousel.route.js"));
app.use("/api/v1/firebase", require("./routes/firebase.route.js"));
app.use("/api/v1/registration", require("./routes/registration.route.js"));
app.use("/api/v1/farmerdetails", require("./routes/farmerdetails.route.js"));
app.use("/api/v1/contactusinfo", require("./routes/contactusinfo.route.js"));
app.use("/api/v1/aboutusinfo", require("./routes/aboutusinfo.route.js"));
app.use("/api/v1/help", require("./routes/help.route.js"));
app.use("/api/v1/term", require("./routes/term.route.js"));
app.use("/api/v1/training", require("./routes/training.route.js"));
app.use("/api/v1/soilconfig", require("./routes/soilconfig.route.js"));
app.use("/api/v1/pullsoildetails", require("./routes/pullsoildetails.route.js"));



//Function to connect to database and execute query
let executeQuery = function (response, query) {
  return new Promise(function (resolve, reject) {
    sql.connect(dbConfig, function (err) {
      if (err) {
        console.log("Error while connecting database :- " + err);
        res.json(err);
      } else {
          // create Request object
        var request = new sql.Request();
        // Return new promise
        console.log(" query ", query);
        // query to the database
        request.query(query, function (err, data) {
          console.log("data in query ", 1);
          if (err) {
            console.log("Error while querying database :- " + err);
            reject(err);
          } else {
            resolve(data);
          }
        });
      }
    });
  });
};

app.listen(PORT, () => {
  console.log(`Listening at : ` + PORT);

});
