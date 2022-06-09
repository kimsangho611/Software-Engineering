const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list", async function(req, res) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = await connection.query(
            "select u.u_email, q.q_title, q.q_date, q.q_answer from user u join questions q on u.u_id = q.User_u_id;");
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.get("/:inquiryId/detail", async function(req, res) {
    const inquiryId = req.params.inquiryId;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = connection.query(
            "select u.u_email, q.q_title, q.q_contents, q.q_answer from user u join questions q on u.u_id = q.User_u_id where q.q_id = ?;",
            [inquiryId]);
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.post("/:inquiryId/upload", async function(req, res) {
    const inquiryId = req.params.inquiryId;
    var answer = req.body.answer;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.query(
            "update questions set q_answer = ? where q_id = ?;",
            [answer, inquiryId]
        );
        res.status(200).send({ success: true, msg: "문의사항 답변 등록을 완료했습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

module.exports = router;