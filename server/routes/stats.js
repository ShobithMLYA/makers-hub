const con = require("../config/connection");

const router = require("express").Router();

router.get("/", (req, res) => {
    try {
        const stats = {
            events: 0,
            speakers: 0,
            participants: 0,
        }
        let sql = "SELECT count(*) FROM events";
        con.query(sql, (err, result) => {
            if (err) throw err;
            stats.events = result[0]["count(*)"];
            sql = "SELECT count(*) FROM speakers";
            con.query(sql, (err, result) => {
                if (err) throw err;
                stats.speakers = result[0]["count(*)"];
                sql = "SELECT count(*) FROM participants";
                con.query(sql, (err, result) => {
                    if (err) throw err;
                    stats.participants = result[0]["count(*)"];
                    res.status(200).send({ message: "success", data: stats });
                });
            });
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;