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
  let token_res = await jwt.verify(req.headers.authorization);
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql2 =
      "select *,count(Product_p_id) as likecnt from product LEFT JOIN shopbasket on shopbasket.Product_p_id = product.p_id where product.p_id=?;";
    let sql1 =
      "SELECT count(*) as isLike FROM secondhand.shopbasket where User_u_id=? and Product_p_id=?;";
    const detail = await connection.query(sql2, [req.body.productId]);
    const isLike = await connection.query(sql1, [
      token_res.uid,
      req.body.productId,
    ]);
    const detail2 = detail[0];
    res.status(200).send({ list: detail2[0], isLike: isLike[0][0].isLike });
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

router.get("/list", async function (req, res) {
  var { orderBy, min, max, bigCategory, smallCategory } = req.query;
  var datas = [min, max, bigCategory, smallCategory];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql =
      orderBy === "1"
        ? "select * ,count(Product_p_id) as likecnt from product LEFT outer join shopbasket on shopbasket.Product_p_id = product.p_id where (p_price between ? and ?) and p_category1 = ? and p_category2 = ? group by product.p_id order by p_date DESC;"
        : "select * ,count(Product_p_id) as likecnt from product LEFT outer join shopbasket on shopbasket.Product_p_id = product.p_id where (p_price between ? and ?) and p_category1 = ? and p_category2 = ? group by product.p_id order by p_view DESC;";
    const result1 = await connection.query(sql, datas);

    res.status(200).send({ success: true, list: result1[0] });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
