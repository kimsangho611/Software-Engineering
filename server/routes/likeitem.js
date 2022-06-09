const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.post("/", async function (req, res) {
  let token_res = await jwt.verify(req.headers.authorization);
  var productId = req.body.productId;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.query(
      "insert into shopbasket(User_u_id, Product_p_id) values (?, ?);",
      [token_res.uid, productId]
    );
    res.status(200).send({ success: true, msg: "해당 상품을 찜하였습니다." });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.delete("/", async function (req, res) {
  let token_res = await jwt.verify(req.headers.authorization);
  var productId = req.body.productId;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.query(
      "delete from shopbasket where User_u_id=? and Product_p_id=?;",
      [token_res.uid, productId]
    );
    res.status(200).send({ success: true, msg: "찜이 취소되었습니다." });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
