var mysql = require('mysql');

var con = mysql.createConnection({
  host: "node11857-env-3001198.my.p4d.click",
  user: "root",
  password: "QKCqel28161",
  database:"logistic"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});