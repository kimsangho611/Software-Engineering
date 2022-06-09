const express = require("express");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql");
const pool2 = require("../module/mysql2");

router.get("/", function (req, res) {
  var token = req.query;
  try {
    var check = jwt.verify(token, "");
    if (check) {
      res.status(200).send({ success: true, msg: "유효한 토큰입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: false, msg: "토큰이 만료되었습니다." });
  }
});

router.post("/login/:type", function (req, res, next) {
  const type = req.params.type;
  var email = req.body.email;
  var password = req.body.password;
  var datas = [email, password];

  pool.getConnection(function (err, connection) {
    var sql = "SELECT * FROM user WHERE u_email=? and u_pw=?;"; //관리자로 변경해야함.
    connection.query(sql, datas, async function (err, result) {
      if (err) {
        res.status(500).send({ success: false, msg: "DB 오류" + err });
        console.error("err : " + err);
      } else {
        if (result.length > 0) {
          const jwtToken = await jwt.sign({
            uid: result[0].u_id,
            admin: result[0].u_admin,
            id: result[0].u_email,
            name: result[0].u_name,
          });
          res.send({ success: true, jwtToken: jwtToken.token });
        } else
          res.status(401).send({
            success: false,
            msg: "이메일 또는 비밀번호를 다시 확인해주세요.",
          });
      }
      connection.release();
    });
  });
});

router.post("/signup/:type", async function (req, res, next) {
  const type = req.params.type;
  const { email, password, name, phone } = req.body;
  var datas = [email, password, name, phone, type];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const result1 = await connection.query(
      "select * from user where u_email=?;",
      [email]
    );
    const data1 = result1[0];
    if (data1.length > 0) {
      res.status(401).send({
        success: false,
        msg: "이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.",
      });
    } else {
      var sql =
        "insert into user(u_email, u_pw, u_name, u_phone, u_admin) values (?,?,?,?,?);";
      await connection.query(sql, datas);
      res.status(200).send({ success: true, msg: "회원가입 성공" });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.delete("/drop", async function (req, res, next) {
  const { email, password } = req.body;
  var token_res = await jwt.verify(req.headers.authorization);
  var datas = [email, password];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const result1 = await connection.query(
      "SELECT * FROM user WHERE u_email=? and u_pw=?;",
      datas
    );
    if (result1.length > 0) {
      await connection.query(
        "delete from shopbasket where User_u_id=?;\
        delete from user where u_email =? and u_pw =?;",
        [token_res.uid, email, password]
      );
      res
        .status(200)
        .send({ success: true, msg: "회원 탈퇴가 완료되었습니다." });
    } else {
      res.status(401).send({
        success: false,
        msg: "이메일 또는 비밀번호가 일치하지 않습니다.",
      });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/report", async function (req, res) {
  const { token, title, contents, productId } = req.body;
  var token_res = await jwt.verify(token);
  var datas = [title, contents, token_res.uid, productId];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 신고에 실패했습니다. 다시 로그인해주세요.",
      });
    } else {
      await connection.query(
        "insert into report(r_title, r_contents, User_u_id, Product_p_id) values (?,?,?,?);",
        datas
      );
      res
        .status(200)
        .send({ success: true, msg: "해당 게시물이 신고 처리 되었습니다." });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" });
  } finally {
    connection.release();
  }
});

router.get("/editInfo", async function (req, res) {
  var token_res = await jwt.verify(req.headers.authorization);

  console.log(token_res);
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되었습니다. 다시 로그인해주세요.",
      });
    } else {
      const result1 = await connection.query(
        "select u.u_email, u.u_name, u.u_phone, u.u_sign_date from user u  where u.u_id = ?;",
        [token_res.uid]
      );
      res.status(200).send({ success: true, info: result1[0] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.post("/editInfo", async function (req, res) {
  const { token, email, oldpw, newpw, name, phone } = req.body;
  var token_res = await jwt.verify(token);
  var datas = [name, newpw, phone, email, token_res.id, oldpw];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    if (token_res === 401) {
      res.status(401).send({
        success: false,
        msg: "로그인 기한이 만료되어 수정에 실패했습니다. 다시 로그인해주세요.",
      });
    } else {
      const result1 = await connection.query(
        "SELECT * FROM user WHERE u_email=? and u_pw=?;",
        [token_res.id, oldpw]
      );
      if (result1[0].length <= 0) {
        res.status(401).send({
          success: false,
          msg: "비밀번호가 일치하지 않습니다. 다시 시도해주세요.",
        });
      } else {
        await connection.query(
          "update user set u_name = ?, u_pw = ?, u_phone=?, u_email=? where u_email =? and u_pw = ?;",
          datas
        );
        res.status(200).send({ success: true, msg: "수정이 완료되었습니다." });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
