const con = require("../config/connection");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send("Login");
});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {
  try {
    const sql = "INSERT INTO feedback SET ?";
    con.query(sql, req.body, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(200).send({ status: 409, message: err.sqlMessage });
      }
      res.status(200).send({ status: 200, message: "success", data: { ...result } });
    });
  } catch (error) {
    res.status(500).send({ message: error, status: 500 });
  }
});

module.exports = router;
