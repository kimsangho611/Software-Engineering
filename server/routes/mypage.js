const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list/buy", async function (req, res) {
  var token_res = await jwt.verify(req.headers.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 구매 목록을 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      const result = await connection.query(
        "select *\
        from product p join (\
          select o.Product_p_id\
            from user u left join `order` o on u.u_id = o.User_u_id\
            where u.u_id = ?) u_o on p.p_id = u_o.Product_p_id;",
        [token_res.uid]
      );
      res.status(200).send({ success: true, result: result[0] });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.get("/list/sell", async function (req, res) {
  var token_res = await jwt.verify(req.headers.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 판매 목록을 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      const result = await connection.query(
        "select p.p_id, p.p_category1, p.p_category2, p.p_title, p.p_date, p.p_trade,p.p_image \
                from user u join product p on u.u_id = p.User_u_id where u.u_id = ?;",
        [token_res.uid]
      );
      res.status(200).send({ success: true, result: result[0] });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.get("/list/activity", async function (req, res) {
  const type = req.query.type;
  const token_res = await jwt.verify(req.headers.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        suceess: false,
        msg: "로그인 기한이 만료되어 활동 목록을 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      if (type === "1") {
        const result = await connection.query(
          "select p.* from product p join (select sb.Product_p_id from user u join shopbasket sb on u.u_id = sb.User_u_id where u.u_id = ?) u_sb on p.p_id = u_sb.Product_p_id;",
          [token_res.uid]
        );
        var likecnt = result[0].length;

        res.status(200).send({ success: true, result: result[0], likecnt: likecnt});
      } else if (type === "2") {
        const result = await connection.query(
          "select p.* from product p join (select pi.Product_p_id from user u join productinquiry pi on u.u_id = pi.User_u_id where u.u_id = ?) u_pi on p.p_id = u_pi.Product_p_id;",
          [token_res.uid]
        );
        res.status(200).send({ success: true, result: result[0]});
      } else {
        res.status(401).send({ success: false, msg: "잘못된 type 입니다." });
      }
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/list/buy/:productId", async function (req, res) {
  var productId = req.params.productId;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.query(
      "update product set p_trade = '확정 대기 중' where p_id = ?",
      [productId]
    );
    res.status(200).send({
      success: true,
      msg: "거래 확정이 완료되었습니다. 판매자가 거래 확정을 할 때까지 기다려주세요",
    });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/list/sell/:productId", async function (req, res) {
  var productId = req.params.productId;

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.query(
      "update product set p_trade = '판매 완료' where p_id = ?",
      [productId]
    );
    res.status(200).send({
      success: true,
      msg: "최종적으로 구매자와 거래가 완료되었습니다.",
    });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
