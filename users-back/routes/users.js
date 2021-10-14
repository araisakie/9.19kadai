const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const validator = require("../middleware/validator");
const db = new sqlite3.Database("users.db");

/* ホーム画面読み込み */
router.get("/api/v1/users", (req, res) => {
  const db = new sqlite3.Database("users.db");
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
  } finally {
    db.close();
  }
});

/* idに紐づいたAPI(取得) */
router.get("/api/v1/users/:id", (req, res) => {
  const db = new sqlite3.Database("users.db");

  try {
    db.serialize(() => {
      db.get(`select * from users where id = ?`, [id], (err, row) =>
        res.status(200).json({ searchData: row })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "取得に失敗しました", error: e });
  } finally {
    db.close();
  }
});

/* 新規登録 */
router.post("/api/v1/users", validator, (req, res) => {
  const db = new sqlite3.Database("users.db");

  const { name, email, age, telephone } = req.body;

  try {
    db.serialize(() => {
      db.exec(
        `insert into users (name, email, age, telephone) values("${name}","${email}","${age}","${telephone}")`,
        () => res.status(200).json({ message: "ユーザーの登録に成功しました" })
      );
    });
  } catch (e) {
    res
      .status(500)
      .json({ errorMessage: "ユーザーの登録に失敗しました", error: e });
  } finally {
    db.close();
  }
});

/* 削除 */
router.delete("/api/v1/users/:id", (req, res) => {
  const db = new sqlite3.Database("users.db");
  const { id } = req.params;
  try {
    db.serialize(() => {
      db.exec(`delete from users where id = ${id}`, () =>
        res.status(200).json({ message: "削除できました" })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "削除できませんでした", error: e });
    console.error(e);
  } finally {
    db.close();
  }
});

/* 更新 */
router.put("/api/v1/users/:id", validator, (req, res) => {
  const db = new sqlite3.Database("users.db");

  const { name, email, age, telephone } = req.body;

  try {
    db.serialize(() => {
      db.exec(
        `update users set name="${name}",email="${email}",age="${age}",telephone="${telephone}" where id="${id}"`,
        () => {
          res.status(200).json({ message: "更新ができました" });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "更新できませんでした", error: e });
  } finally {
    db.close();
  }
});

module.exports = router;
