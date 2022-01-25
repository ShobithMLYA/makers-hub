const router = require("express").Router();
const uploadImage = require("../_helpers/file-upload");
const con = require("../config/connection");

router.get("/", (req, res) => {
  try {
    const sql = "SELECT * FROM speakers";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).send({ message: "success", data: result });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", (req, res) => {
  res.status(200).send("Login");
});

router.post("/", uploadImage.single("speaker_photo"), (req, res) => {
  try {
    console.log(req.file);
    const speaker = req.body;
    speaker.speaker_photo = req.file.filename;

    const sql = "INSERT INTO speakers SET ?";
    con.query(sql, speaker, (err, result) => {
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
