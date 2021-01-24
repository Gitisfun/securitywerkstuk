const express = require('express');
const router = express.Router()
const pool = require("../../database/config");
const verifyToken = require("../../middleware/auth");

router.get('/', verifyToken, (req, res) => {
    if (req.user.foundUser.role == 2) {
        pool.query(
            "SELECT bezwaar.id, bezwaar.title 'title',bezwaar. body 'body', bezwaar.user_id 'user_id', users.id 'user_id', users.username 'user_username' from bezwaar INNER JOIN users ON bezwaar.user_id = users.id",
            (err, results) => {
                if (err) res.send(err);
                else {
                    res.send(results);
                }
            }
        );
    }
    else {
        const sql = "SELECT bezwaar.id, bezwaar.title 'title',bezwaar. body 'body', bezwaar.user_id 'user_id', users.id 'user_id', users.username 'user_username' from bezwaar INNER JOIN users ON bezwaar.user_id = users.id WHERE bezwaar.user_id = ?";

        pool.query(sql,
            [req.user.foundUser.id], (err, results) => {
                if (err) res.send(err);
                else {
                    res.send(results);
                }
            }
        );
    }

});

router.post("/", verifyToken, (req, res) => {

    if (req.user.foundUser.id == req.body.user_id) {

        const sql =
            "INSERT INTO bezwaar(title, body, user_id) VALUES (?, ?, ?)";
        pool.query(
            sql,
            [
                req.body.title,
                req.body.body,
                req.body.user_id
            ],
            (err, results) => {
                if (err) console.log(err);
                else {
                    const item = {
                        id: results.insertId,
                        naam: req.body.title,
                    };

                    res.send(item);
                }
            }
        );
    } else {
        res
            .status(401)
            .json({ msg: `Forbidden` });
    }

});

module.exports = router;