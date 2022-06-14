const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list", async function (req, res) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await connection.query(
      "select u.u_email, u.u_name, u.u_phone, u.u_sign_date, count(*) from user u join product p on u.u_id = p.User_u_id \
      group by u.u_email;"
    );
    res.status(200).send({ success: true, result: result[0] });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.get("/detailInfo", async function(req, res) {
  var productId = req.body.productId;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result1 = await connection.query(
      "select u.u_id from user u join product p on u.u_id = p.User_p_id where p.p_id = ?", [productId]);
    
    var u_id = result1[0].u_id;

    const result2 = await connection.query("select * from review where User_u_id = ?", [u_id]);
    res.status(200).send({ success: true, result: result2[0]});
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err});
  } finally {
    connection.release();
  }
})

module.exports = router;
