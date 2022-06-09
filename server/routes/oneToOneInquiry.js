const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/", async function(req, res) {
    var token_res = await jwt.verify(req.body.token);

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        if (token_res === 401) {
            res.status(401).send({ success: false, msg: "로그인 기간이 만료되어 1:1문의를 할 수 없습니다. 다시 로그인해주세요."});
        } else {
            const result = await connection.query(
                "select u.u_email, q.q_title, q.q_date, q.q_answer from user u join questions q on u.u_id = q.User_u_id where u.u_id = ?;", [token_res.uid]);
            
            res.status(200).send({ success: true, result: result[0]});
        }
    } catch (err) { 
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.post("/", async function(req, res) {
    const {token, title, contents} = req.body;
    var token_res = await jwt.verify(token);

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        if (token_res === 401) {
            res.status(401).send({ success: false, msg: "로그인 기한이 만료되어 1:1문의를 할 수 없습니다. 다시 로그인해주세요."});
        } else {
            const result = await connection.query(
                "insert into questions(q_title, q_contents, User_u_id) values (?,?,?);", [title, contents, token_res.uid]
            );
            res.status(200).send({ success: true, result: result[0]});
        }
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});