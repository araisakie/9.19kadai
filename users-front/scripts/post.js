"use strict";

function register() {
  const $submitButton = document.getElementById("submit-button");

  /**
   * 登録処理
   */
  async function post() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const telephone = document.getElementById("telephone").value;

    try {
      const res = await fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          telephone,
        }).replace(/\s+/g, ""),
      });

      const resResult = await res.json();

      /* エラーor登録完了のダイアログを表示する */
      if (resResult.message) {
        alert(resResult.message);
        location.href = "users.html";
      } else {
        alert(resResult.errorMessage);
      }
    } catch (e) {
      console.error("error:", e.errorMessage);
    }
  }

  /**
   * 更新処理
   * @param {string} id
   */
  async function update(id) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const telephone = document.getElementById("telephone").value;

    try {
      const res = await fetch(`${url}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          age,
          telephone,
        }).replace(/\s+/g, ""),
      });

      const resData = await res.json();

      if (resData.message) {
        alert(resData.message);
        location.href = "users.html";
      } else {
        alert(resData.errorMessage);
      }
    } catch (e) {
      console.error("error:", e.errorMessage);
    }
  }

  /**
   * 保存ボタン押下
   */
  $submitButton.addEventListener("click", () => {
    const param = location.search;

    if (param) {
      const id = param.slice(4);
      update(id);
    } else {
      post();
    }
  });
}

addEventListener("load", () => {
  register();
});
