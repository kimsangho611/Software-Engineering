const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");

router.get("/list", async function(req, res) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = await connection.query("select * from announce;");
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.get("/detail", async function(req, res) {
    var noticeId = req.query;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = await connection.query(
            "select * from announce where post_id = ?;", [noticeId]
        );
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }

});

router.post("/upload", async function(req, res) {
    var title = req.body.title;
    var contents = req.body.contents;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.query(
            "insert into announce(post_title, post_contents) values (?,?);", 
            [title, contents]
        );
        res.status(200).send({ success: true, msg: "공지사항 등록이 완료되었습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.post("/:noticeId/edit", async function(req, res) {
    const noticeId = req.params.noticeId;
    const {title, contents} = req.body;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.query(
            "update announce set post_title = ?, post_contents = ? where post_id = ?;",
            [title, contents, noticeId]
        );
        res.status(200).send({ success: true, msg: "공지사항 수정이 완료되었습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.delete("/:noticeId/delete", async function(req, res) {
    const noticeId = req.params.noticeId;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.query(
            "delete from announce where post_id = ?;", [noticeId]);
        res.status(200).send({ success: true, msg: "공지사항이 삭제되었습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

module.exports = router;