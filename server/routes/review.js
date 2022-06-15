const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.post("/product/:productId", async function (req, res) {
  var productId = req.params.productId;
  var review_title = req.body.review_title;
  var review_contents = req.body.review_contents;
  var review_star = req.body.review_star;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await connection.query(
      "select u.u_id from user u join product p on u.u_id = p.User_u_id where p.p_id = ?",
      [productId]
    );

    var u_id = result[0].u_id;

    await connection.query(
      "insert into review(re_title, re_contents, re_star, User_u_id, Product_p_id values (?,?,?,?,?);",
      [review_title, review_contents, review_star, u_id, productId]
    );

    res.status(200).send({ success: true, msg: "후기 등록이 완료되었습니다." });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
