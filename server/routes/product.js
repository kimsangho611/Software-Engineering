const express = require("express");
const router = express.Router();
const pool2 = require("../module/mysql2");
const jwt = require("../module/jwt");
const upload = require("../module/imgUpload");

router.post(
  "/upload",
  upload().single("file"),
  async function (req, res, next) {
    const body = req.body;
    let verify = await jwt.verify(req.headers.authorization);
    let datas = [
      req.file.path.split("public")[1],
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
        "insert into product(p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      await connection.query(sql, datas);
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    } finally {
      connection.release();
    }
  }
);

router.post("/detail", async function (req, res, next) {
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql2 =
      "select *,count(Product_p_id) as likecnt from product LEFT JOIN shopbasket on shopbasket.Product_p_id = product.p_id where product.p_id=?;";
    const detail = await connection.query(sql2, [req.body.productId]);
    const detail2 = detail[0];
    res.status(200).send(detail2[0]);
  } catch (err) {
    res.status(500).send();
  } finally {
    connection.release();
  }
});

router.post("/hit", async function (req, res, next) {
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql = "update product set p_view = p_view+1 where p_id = ?;";
    await connection.query(sql, [req.body.productId]);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  } finally {
    connection.release();
  }
});

module.exports = router;
