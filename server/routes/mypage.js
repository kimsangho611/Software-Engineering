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
        "select p.p_category1, p.p_category2, p.p_title, p.p_date, p.p_trade,p.p_image \
                from product p where p.p_id = (select o.Product_p_id from user u join `order` o on u.u_id = o.User_u_id where u.u_id = ?);",
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
        "select p.p_category1, p.p_category2, p.p_title, p.p_date, p.p_trade,p.p_image \
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

router.get("/list/activity?type=:type", async function (req, res) {
  const type = req.params.type;
  const token_res = await jwt.verify(req.header.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        suceess: false,
        msg: "로그인 기한이 만료되어 활동 목록을 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      if (type === 1) {
        const result = await connection.query(
          "select p.p_category1, p.p_category2, p.p_title, p.p_date, p.p_trade,p.p_image  \
                    from product p where p.p_id = (select sb.Product_p_id from user u join shopbasket sb on u.u_id = sb.User_u_id where u.u_id = ?);",
          [token_res.uid]
        );
        res.status(200).send({ success: true, result: result[0] });
      } else if (type === 2) {
        const result = await connection.query(
          "select p.p_category1, p.p_category2, p.p_title, p.p_date, p.p_trade,p.p_image  \
                    from product p where p.p_id = (select p_i.Product_p_id from user u join productinquiry p_i on u.u_id = p_i.User_u_id where u.u_id = ?);",
          [token_res.uid]
        );
        res.status(200).send({ success: true, result: result[0] });
      } else {
        res.status(401).send({ success: false, msg: "잘못된 type 입니다." });
      }
    }
  } catch (err) {
    req.stale(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
