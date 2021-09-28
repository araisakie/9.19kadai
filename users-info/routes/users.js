const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("users.db");

/* ホーム画面読み込み */
router.get("/api/v1/users", (req, res) => {
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
router.get("/api/v1/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    // ここも
    db.serialize(() => {
      db.get(`select * from users where id = ?`, [id], (err, row) =>
        res.status(200).json({ searchData: row })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "取得に失敗しました", error: e });
  }
});

/* 新規登録 */
router.post("/api/v1/users", (req, res) => {
  try {
    const { name, email, age, telephone } = req.body;
    // 空やったら全部弾く
    // 名前(20文字), email(@がなかったら弾く) age(3桁) 電話番号(11, 10)

    // if(名前 > 20){
    //    res.status(400?).json({message: 名前は20文字以下です})
    //}
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
    console.error(e);
  }
});

/* 削除 */
router.delete("/api/v1/users/:id", (req, res) => {
  try {
    const { id } = req.params;
    // idがあるかチェックする
    db.serialize(() => {
      db.exec(`delete from users where id = ${id}`, () =>
        res.status(200).json({ message: "削除できました" })
      );
    });
  } catch (e) {
    res.status(500).json({ errorMessage: "削除できませんでした", error: e });
    console.error(e);
  }
});

module.exports = router;
