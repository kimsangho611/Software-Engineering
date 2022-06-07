const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "secondhand",
  multipleStatements: true,
});

module.exports = pool;
