const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");
const { post } = require("./inquire");
const { report } = require("./point");

router.get("/list", async function (req, res) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const result = await connection.query(
      "select p.p_id, u.u_email, p.p_trade, p.p_date from user u join product p on u.u_id = p.User_u_id order by p.p_id desc;"
    );
    res.status(200).send({ success: true, result: result[0] });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

router.delete("/:postId/delete", async function (req, res) {
  const postId = req.params.postId;
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.query("delete from product where p_id = ?;", [postId]);
    res.status(200).send({ success: true, msg: "게시물이 삭제되었습니다." });
  } catch (err) {
    res.status(500).send({ success: false, msg: "서버 오류" + err });
  } finally {
    connection.release();
  }
});

module.exports = router;
