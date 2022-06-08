const express = require("express");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql");
const pool2 = require("../module/mysql2");

router.post("/", function (req, res, next) {
  res.send({ msg: "안녕" });
});

router.post("/login/:type", function (req, res, next) {
  const type = req.params.type;
  console.log("type!!!!!", type);
  var email = req.body.email;
  var password = req.body.password;
  var datas = [email, password];

  pool.getConnection(function (err, connection) {
    var sql =
      type === 1
        ? "SELECT * FROM user WHERE u_email=? and u_pw=?;"
        : "SELECT * FROM user WHERE u_email=? and u_pw=?;";
    connection.query(sql, datas, async function (err, result) {
      if (err) {
        res.status(500).send({ success: false, err: "DB 오류" + err });
        console.error("err : " + err);
      } else {
        console.log("sql==", sql);
        console.log("data==", datas);
        console.log("result==", result);
        if (result.length > 0) {
          const jwtToken = await jwt.sign({
            id: result[0].u_email,
            name: result[0].u_name,
          });
          res.send({ success: true, jwtToken: jwtToken.token });
        } else
          res.status(401).send({
            success: false,
            err: "이메일 또는 비밀번호를 다시 확인해주세요.",
          });
      }
      connection.release();
    });
  });
});

router.post("/signup", async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var phone = req.body.phone;
  var datas = [email, password, name, phone];

  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const result1 = await connection.query(
      "select * from user where u_email=?;",
      [email]
    );
    console.log("result signup==", result1);
    const data1 = result1[0];
    if (data1.length > 0) {
      res.status(401).send({
        success: false,
        msg: "이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.",
      });
    } else {
      var sql =
        "insert into user(u_email, u_pw, u_name, u_phone) values (?,?,?,?);";
      await connection.query(sql, datas);
      res.status(200).send({ success: true, msg: "회원가입 성공" });
    }
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
