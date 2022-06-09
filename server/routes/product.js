const express = require("express");
const router = express.Router();
const pool2 = require("../module/mysql2");
const jwt = require("../module/jwt");

router.post("/upload", async function (req, res, next) {
  const body = req.body;
  let verify = await jwt.verify(req.headers.authorization);
  let datas = [
    body.thumbnail,
    body.cate1,
    body.cate2,
    body.title,
    body.price,
    body.originPrice,
    body.size,
    body.state,
    body.wearCnt,
    body.pollution,
    body.introduction,
    verify.uid,
  ];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql =
      "insert into product(p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id) values(null, null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await connection.query(sql, datas);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  } finally {
    connection.release();
  }
});

module.exports = router;
