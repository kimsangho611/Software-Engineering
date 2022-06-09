const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/now", async function (req, res) {
  var token_res = await jwt.verify(req.headers.authorization);
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기간이 만료되어 포인트롤 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      const result = await connection.query(
        "select u_point from user where u_id = ?;",
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

router.post("/buy", async function (req, res) {
  const { productId } = req.body;
  var token_res = await jwt.verify(req.headers.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 상품 구매에 실패했습니다. 다시 로그인해주세요.",
      });
    } else {
      const result1 = await connection.query(
        "select u.u_point, p.p_title, p.p_price from user u join product p on u.u_id = p.User_u_id where p.p_id = ?;",
        [productId]
      ); // 여기서 상품의 가격과 사용자의 보유 포인트를 조회
      const result2 = result1[0];
      const u_point = result2[0].u_point;
      const p_title = result2[0].p_title;
      const p_price = result2[0].p_price;

      if (u_point < p_price) {
        res.status(401).send({
          success: false,
          msg: "제품의 가격이 사용자의 포인트보다 많습니다.",
        });
      } else {
        await connection.query(
          "update user set u_point = u_point - ? where u_id = ?; \
                    insert into point(point_title, point_amount, User_u_id) values (?,?,?);\
                    insert into secondhand.order(User_u_id, Product_p_id) values (?,?);",
          [p_price, token_res.uid, p_title, -1 * p_price, token_res.uid, token_res.uid, productId]
        );

        res
          .status(200)
          .send({ success: true, msg: "상품 구매에 성공하였습니다." });
      }
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/list", async function (req, res) {
  var token_res = await jwt.verify(req.headers.authorization);
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 포인트 내역을 조회할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      const result = await connection.query(
        "select u.u_point, p.* from user u join point p on u.u_id = p.User_u_id where u.u_id = ? order by p.point_date DESC;",
        [token_res.uid]
      );
      res.status(200).send({ success: true, result: result[0] });
    }
  } catch (err) {
    res.status(500).send({ success: true, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/charge", async function (req, res) {
  const pointAmount = req.body.pointAmount;
  var token_res = await jwt.verify(req.headers.authorization);

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 포인트를 충전할 수 없습니다. 다시 로그인해주세요.",
      });
    } else {
      await connection.query(
        "update user set u_point = u_point + ? where u_id = ?; \
                insert into point(point_title, point_amount, User_u_id) values ('포인트 충전', ?, ?);",
        [pointAmount, token_res.uid, pointAmount, token_res.uid]
      );
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).send({ success: true, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
