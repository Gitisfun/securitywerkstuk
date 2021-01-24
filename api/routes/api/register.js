const express = require('express');
const router = express.Router()
const pool = require("../../database/config");
const bcrypt = require("bcrypt");
const emailservice = require("../../email/emailservice");
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      console.log(err);
    }
    const sql1 = `SELECT COUNT(*) "aantal" FROM users WHERE username = ?`;

    const sql2 =
      "INSERT INTO users(username, password, email, role,verified) VALUES (?,?,?,?,?)";

    pool.query(sql1, [req.body.username], (err, result) => {
      if (err) console.log(err);
      else if (result[0].aantal >= 1) {
        res.json({
          msg: "User does already exist",
          status: false
        });
      } else {
        pool.query(
          sql2,
          [
            req.body.username,
            hash,
            req.body.email,
            req.body.role,
            0
          ],
          (err, results) => {
            if (err) console.log(err);
            else {
              console.log(req.body.email)
              jwt.sign({ username: req.body.username,}, process.env.EMAIL_SECRET,{ expiresIn: '1d'}, (err, emailToken) => {
                  const url = `http://localhost:5000/api/confirmation/${emailToken}`;
                  console.log(emailToken)

                  var mailOptions = {
                    from: process.env.GMAIL_USER,
                    to: req.body.email,
                    subject: 'Confirm Email',
                    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                  };

                  emailservice.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                },
              );
              res.status(200).json({
                msg: "You are registered, please check your mail to verify",
                status: true
              });
            }
          }
        );
      }
    });
  });
});

module.exports = router;