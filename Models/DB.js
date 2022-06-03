const mysql = require("mysql");

const db = mysql.createConnection({
  host: "picword.cgsg7oacezid.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "Dione&169",
  database:"pic4-1word",
});
// const db = mysql.createConnection({
//   host: "localhost",
//   // port: "3306",
//   user: "root",
//   password: "",
//   database: "dione",
//   // socketPath: "/var/run/mysqld/mysqld.sock",
// });

// var query = ;

// db.query("CREATE TABLE IF NOT EXISTS user (id int NOT NULL AUTO_INCREMENT,name varchar(255) NULL,email varchar(255) null,password varchar(255) null,PRIMARY KEY (id)");

module.exports = db;