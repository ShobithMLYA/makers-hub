const router = require("express").Router();
const con = require('../config/connection');
const bcrypt = require('bcryptjs');

router.post("/login", (req, res) => {
  const { org_email, org_password } = req.body;
  console.log(req.body)
  con.query(
    `SELECT * FROM organisations WHERE org_email = '${org_email}'`,
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.send({
          status: "error",
          message: "Email not found",
        });
      } else {
        const hash = result[0].org_password;
        bcrypt.compare(org_password, hash, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            res.send({
              status: "success",
              message: "Login success",
              data: result[0],
            });
          } else {
            res.send({
              status: "error",
              message: "Password not match",
            });
          }
        });
      }
    }
  );
});

module.exports = router;
