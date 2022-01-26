const router = require("express").Router();
const con = require("../config/connection");

router.get("/", (req, res) => {
  try {
    const sql =
      "SELECT * FROM events INNER JOIN speakers ON events.speaker_id = speakers.speaker_id";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    const sql = "SELECT * FROM events WHERE event_id = ?";
  } catch (error) {}
});

router.post("/", (req, res) => {
  try {
    const sql = "INSERT INTO events SET ?";
    con.query(sql, req.body, (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: { ...result } });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/", (req, res) => {
  res.status(200).send("Login");
});

router.delete("/", (req, res) => {
  res.status(200).send("Login");
});

module.exports = router;
