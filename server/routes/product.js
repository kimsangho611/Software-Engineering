const express = require("express");
const router = express.Router();
const pool2 = require("../module/mysql2");

router.post("/upload", async function (req, res, next) {
  // insert into product(p_thumnail, p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id)
  // values (null, null, "카테고리1", "카테고리2", "블라우스 팝니다.", 30000, 100000, "S", "좋음", 10, "N", "많이 입지 않은 블라우스 팝니다.", 1);
  const body = req.body;
  let datas = [
    body.thumbnail,
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
    1,
  ]; //p_thumbnail, p_image, user_u_id 수정 필요

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    let sql =
      "insert into product(p_thumnail, p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id) values(null, null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    await connection.query(sql, datas);
    res.status(200).send();
  } catch (err) {
    res.status(500).send();
  } finally {
    connection.release();
  }
});

module.exports = router;
