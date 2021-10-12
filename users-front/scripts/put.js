"use strict";

async function put(id) {
  console.log(id);

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;
  const telephone = document.getElementById("telephone").value;

  const body = {
    name: name,
    email: email,
    age: age,
    telephone: telephone,
  };

  try {
    const res = await fetch(`${url}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(body);

    const putData = await res.json();

    if (putData.message) {
      alert(putData.message);
      //   location.href = "users.html";
    } else {
      alert(putData.errorMessage);
    }

    // location.href = "users.html";
  } catch (e) {
    console.error("error:", e.errorMessage);
  }
}
