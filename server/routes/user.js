const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list", async function (req, res) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await connection.query(
      "select u.u_email, u.u_name, u.u_phone, u.u_sign_date, count(*) sell_count from user u join product p on u.u_id = p.User_u_id;"
    );
    res.status(200).send({ success: true, result: result[0] });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
