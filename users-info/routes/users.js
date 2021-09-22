const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("users.db");

/* ホーム画面読み込み */
router.get("/api/v1", (req, res) => {
  try {
    db.serialize(() => {
      db.all(
        "select id, name, age, email, telephone from users",
        (err, rows) => {
          res.status(200).json({ userData: rows });
        }
      );
    });
  } catch (e) {
    res.status(500).json({
      errorMessage: "データーベースのアクセスに失敗しました",
      error: e,
    });
  }
});

/* idに紐づいたAPI(取得) */
router.get("/api/v1/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.serialize(() => {
      db.get(`select * from users where id = "${id}"`, (err, row) =>
        res.status(200).json({ Database: row })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "取得に失敗しました", error: e });
  }
});

/* 新規登録 */
router.post("/api/v1", (req, res) => {
  try {
    const { name, email, age, telephone } = req.body;
    db.serialize(() => {
      db.post(
        `insert into users (name, email, age, telephone) values("${name}","${email}","${age}","${telephone}")`,
        () => res.status(200).json({ message: "ユーザーの登録に成功しました" })
      );
    });
  } catch (e) {
    res
      .status(500)
      .json({ errorMessage: "ユーザーの登録に失敗しました", error: e });
  }
});

/* 削除 */
router.delete("/api/v1/:id", (req, res) => {
  try {
    const { id } = req.params;
    db.serialize(() => {
      db.delete(`delete from users where id = "${id}"`, () =>
        res.status(200).json({ message: "削除できました" })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "削除できませんでした", error: e });
  }
});

module.exports = router;
