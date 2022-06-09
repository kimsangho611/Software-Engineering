const express = require("express");
const token = require("../config/token");
const router = express.Router();
const jwt = require("../module/jwt");
const pool = require("../module/mysql2");
const { report } = require("./point");

router.get("/list", async function(req, res) {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = connection.query(
            "select reporting_u.u_email, reported_u.u_email, reported_u.r_title \
                from (select u.u_email, u.u_id from user u join report r on u.u_id = r.User_u_id) reporting_u \
                join (select u_p.u_email, r.* from report r \
                    join (select u.u_email, u.u_id, p.p_id from user u join product p on u.u_id = p.User_u_id) \
                    u_p on r.Product_p_id = u_p.p_id) \
            reported_u on reporting_u.u_id = reported_u.User_u_id;"
        );
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.get("/:reportId/detail", async function(req, res) {
    const reportId = req.params.reportId;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        const result = connection.query(
            "select u.u_email, r.r_title, r.r_contents from user u join report r on u.u_id = r.User_u_id where r.r_id = ?;",
            [reportId]
        );
        res.status(200).send({ success: true, result: result[0]});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.post("/:reportId/stopId", async function(req, res) {
    const reportId = req.params.reportId;

    const connection = await pool.getConnection(async (conn) => conn);
    try {
        await connection.query(
            "update user set u_stop = 1 where u_email = \
            (select u_p.u_email from report r join (select u.u_email, u.u_id, p.p_id from user u join product p on u.u_id = p.User_u_id) u_p \
            on r.Product_p_id = u_p.p_id and r.r_id = 1);"
        );
        res.status(200).send({ success: true, msg: "신고당한 사용자를 정지하였습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

router.post("/:reportId/ignore", async function(req, res) {
    const reportId = req.params.reportId;
    
    const connection = await pool.getConnection(async (conn) => conn);
    try {
        res.status(200).send({ success: true, msg: "사용자의 신고가 무시되었습니다."});
    } catch (err) {
        res.status(500).send({ success: false, msg: "서버 오류" + err});
    } finally {
        connection.release();
    }
});

module.exports = router;