const express = require('express');
const router = express.Router()
const pool = require("../../database/config");
const verifyToken = require("../../middleware/auth");

router.get('/', (req, res) => {

  const search = req.query.search;


  pool.query(
    "SELECT comments.time 'time', comments.id, comments.title 'title',comments. body 'body', comments.user_id 'user_id', users.id 'user_id', users.username 'user_username' from comments INNER JOIN users ON comments.user_id = users.id WHERE concat(comments.title,comments.body) LIKE concat('%', ?, '%') ORDER BY comments.time DESC",
    [search],
    (err, results) => {
      if (err) res.send(err);
      else {
        res.send(results);
      }
    }
  );
});

router.get("/:id", verifyToken, (req, res) => {
  const sql = "SELECT comments.time 'time', comments.id, comments.title 'title',comments. body 'body', comments.user_id 'user_id', users.id 'user_id', users.username 'user_username' from comments INNER JOIN users ON comments.user_id = users.id WHERE comments.id = ?";
  pool.query(sql, [req.params.id], (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});

router.post("/", verifyToken, (req, res) => {
  const sql =
    "INSERT INTO comments(title, body, time, user_id) VALUES (?, ?, NOW(), ?)";
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
});

router.put("/:id", verifyToken, (req, res) => {
  const sql1 = "SELECT COUNT(*) AS aantal FROM comments WHERE id = ?";

  const sql2 = "UPDATE comments SET title = ?, body = ?, time = NOW(), user_id = ? WHERE id = ?";

  pool.query(sql1, [req.params.id], (err, results) => {
    if (err) console.log(err);
    else {
      if (results[0].aantal > 0) {
        pool.query(
          sql2,
          [
            req.body.title,
            req.body.body,
            req.body.user_id,
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
          .json({ msg: `Geen comment met id ${req.params.id} gevonden` });
      }
    }
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  const sql1 = "SELECT COUNT(*) AS aantal FROM comments WHERE id = ?";

  const sql2 = "DELETE FROM comments WHERE id = ?";

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
          .json({ msg: `Geen comment met id ${req.params.id} gevonden` });
      }
    }
  });
});

module.exports = router;