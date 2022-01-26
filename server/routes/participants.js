const con = require("../config/connection");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("Login");
});

router.get("/:id", (req, res) => {
  res.status(200).send("Login");
});

router.post("/", (req, res) => {
  try {
    const sql = "INSERT INTO participants SET ?";
    con.query(sql, req.body, (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: { ...result } });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", (req, res) => {
  res.status(200).send("Login");
});

module.exports = router;
