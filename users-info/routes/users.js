const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("users.db");

router.get("/", (req, res, next) => {
  try {
    db.serialize(() => {
      db.all("select * from users", (err, rows) => {
        if (!err) {
          const data = {
            title: "Users Info",
            content: rows,
          };
          res.render("users", data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
