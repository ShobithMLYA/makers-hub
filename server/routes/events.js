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
    const sql =
      "SELECT * FROM events INNER JOIN speakers ON events.speaker_id = speakers.speaker_id WHERE event_id = ?";
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: result[0] });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id/responses", (req, res) => {
  try {
    const sql = "SELECT * FROM participants WHERE event_id = ?";
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id/feedbacks", (req, res) => {
  try {
    const sql =
      "SELECT * FROM feedback INNER JOIN participants ON feedback.p_id = participants.p_id WHERE feedback.event_id = ?";
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
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

router.put("/:id", (req, res) => {
  try {
    const sql = "UPDATE events SET ? WHERE event_id = ?";
    con.query(sql, [req.body, req.params.id], (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: { ...result } });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const sql = "DELETE FROM events WHERE event_id = ?";
    con.query(sql, req.params.id, (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: { ...result } });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
