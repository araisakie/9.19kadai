"use strict";

const validator = (req, res, next) => {
  const { name, email, age, telephone } = req.body;
  const emailError = email.match(/@/);

  if (!name) {
    return res.status(400).json({ errorMessage: "名前が入力されていません" });
  }

  if (name.length >= 20) {
    return res.status(400).json({ errorMessage: "名前は20文字以下です" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ errorMessage: "メールアドレスが入力されていません" });
  }

  if (!emailError) {
    return res
      .status(400)
      .json({ errorMessage: "メールアドレスが正しくありません" });
  }

  if (!age) {
    return res.status(400).json({ errorMessage: "年齢が入力されていません" });
  }

  if (String(age).length > 3) {
    return res.status(400).json({ errorMessage: "年齢は３桁までです" });
  }

  if (!telephone) {
    return res
      .status(400)
      .json({ errorMessage: "電話番号が入力されていません" });
  }

  if (String(telephone).length < 10 || String(telephone).length > 11) {
    return res.status(400).json({ errorMessage: "電話番号が正しくありません" });
  }

  next();
};

module.exports = validator;
