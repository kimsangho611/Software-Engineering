const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "secondhand",
  connectionLimit: 5,
  multipleStatements: true,
});

module.exports = pool;
