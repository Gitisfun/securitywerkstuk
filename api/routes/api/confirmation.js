const express = require('express');
const { decode } = require('jsonwebtoken');
const router = express.Router()
const pool = require("../../database/config");
const jwt = require("jsonwebtoken");

router.get("/:token", (req, res) => {
    jwt.verify(req.params.token, process.env.EMAIL_SECRET, function (err, decoded) {
        console.log(decoded)
        
        if (err) res.send(err)
        else {
            const sql =
                "UPDATE users SET verified=? WHERE username=?";

            pool.query(
                sql,
                [1, decoded.username],
                (err, result) => {
                    if (err) console.log(err);
                    else {
                        res.send({
                            msg: "Verified",
                        });
                    }
                }
            );
        }

    });
});

module.exports = router;