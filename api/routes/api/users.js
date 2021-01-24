const express = require('express');
const router = express.Router()
const pool = require("../../database/config");
const verifyToken = require("../../middleware/auth");


router.get("/:id", verifyToken, (req, res) => {

    if (req.user.foundUser.id == req.params.id) {
        const sql = "SELECT id, username 'username', email 'email' from users WHERE id = ?";
        pool.query(sql, [req.params.id], (err, result) => {
            if (err) console.log(err);
            else {
                res.send(result);
            }
        });
    }
    else {
        res
            .status(401)
            .json({ msg: `Forbidden` });
    }

});

router.put("/:id", verifyToken, (req, res) => {
    if (req.user.foundUser.id == req.params.id) {

        const sql1 = "SELECT COUNT(*) AS aantal FROM users WHERE id = ?";

        const sql2 = "UPDATE users SET email = ? WHERE id = ?";

        pool.query(sql1, [req.params.id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results[0].aantal > 0) {
                    pool.query(
                        sql2,
                        [
                            req.body.email,
                            req.params.id
                        ],
                        (err, results2) => {
                            if (err) console.log(err);
                            else {
                                res.send(results2);
                            }
                        }
                    );
                } else {
                    res
                        .status(400)
                        .json({ msg: `Geen user met id ${req.params.id} gevonden` });
                }
            }
        });
    }
    else {
        res
            .status(401)
            .json({ msg: `Forbidden` });
    }
});

router.delete('/:id', verifyToken, (req, res) => {

    if (req.user.foundUser.id == req.params.id) {

        const sql1 = "SELECT COUNT(*) AS aantal FROM users WHERE id = ?";

        const sql2 = "DELETE FROM users WHERE id = ?";

        pool.query(sql1, [req.params.id], (err, results) => {
            if (err) console.log(err);
            else {
                if (results[0].aantal > 0) {
                    pool.query(
                        sql2,
                        [
                            req.params.id
                        ],
                        (err, results2) => {
                            if (err) console.log(err);
                            else {
                                res.send(results2);

                            }
                        }
                    );
                } else {
                    res
                        .status(400)
                        .json({ msg: `Geen user met id ${req.params.id} gevonden` });
                }
            }
        });
    }
    else {
        res
            .status(401)
            .json({ msg: `Forbidden` });
    }
});

module.exports = router;