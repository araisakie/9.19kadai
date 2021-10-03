"use strict";

const url = "http://localhost:3000/api/v1";

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
        name: name,
        email: email,
        age: age,
        telephone: telephone,
      }).replace(/\s+/g, ""),
    });

    const resResult = await res.json();

    /* エラーor登録完了のダイアログを表示する */
    if (resResult.errorMessage) {
      alert(resResult.errorMessage);
    } else {
      alert(resResult.message);
      history.back();
    }
  } catch (e) {
    console.error("error:", e.errorMessage);
  }
}
