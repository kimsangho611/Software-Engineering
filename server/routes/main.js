const express = require("express");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list", async function (req, res) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result1 = await connection.query(
      "select *,count(Product_p_id) as likecnt from product LEFT JOIN shopbasket on shopbasket.Product_p_id = product.p_id group by product.p_id order by likecnt DESC limit 4;"
    );
    const result2 = await connection.query(
      "select *,count(Product_p_id) as likecnt from product LEFT JOIN shopbasket on shopbasket.Product_p_id = product.p_id group by product.p_id order by product.p_date DESC limit 8;"
    );
    res.status(200).send({ success: true, hot: result1[0], new: result2[0] });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
