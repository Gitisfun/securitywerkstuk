const express = require('express');
const router = express.Router()
const pool = require("../../database/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const slowDown = require("express-slow-down");



const slowDownAttempts = slowDown({
  windowMs: 30 * 60 * 1000, 
  delayAfter: 3, 
  delayMs: 1000 
});

router.post("/", slowDownAttempts, (req, res) => {
    const user = req.body;
    let foundUser = null;
    
    const sql = `SELECT * FROM users WHERE UPPER(username) = UPPER(?)`;

    pool.query(sql, [user.username], (err, result) => {
        if (err) console.log(err);
        else {
            
            foundUser = result[0];

            if (foundUser == null) {
                res.json({
                    msg: "User not found",
                    delay: req.slowDown.delay,
                    status: false
                });

            }
            else if (foundUser.verified === 0) {
                res.json({
                    msg: "Verify your email",
                    delay: req.slowDown.delay,
                    status: false
                })
            }
            else {

                bcrypt.compare(
                    user.password,
                    foundUser.password,
                    function (err, result) {
                        if (err) {
                            throw err;
                        }
                        if (!result) {
                            return res.json({
                                msg: "Invalid credentials, try again",
                                delay: req.slowDown.delay,
                                status: false
                            });
                        } else {
                            const ONE_WEEK = 60 * 60 * 24 * 7;
                            const token = jwt.sign({ foundUser }, process.env.SECRET_KEY, {
                                expiresIn: ONE_WEEK,
                            });
                            res.json({
                                msg: "Login succesful",
                                id: foundUser.id,
                                status: true,
                                username: foundUser.username,
                                email: foundUser.email,
                                role: foundUser.role,
                                verified: foundUser.verified,
                                token: token,
                            });
                        }
                    }
                );
            }
        }
    });
});

module.exports = router;