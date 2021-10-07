"use strict";

async function deleteId(id) {
  try {
    const res = await fetch(`${url}/users/${id}`, {
      method: "DELETE",
    });
    const resData = await res.json();
    alert(resData.message);

    location.href = "users.html";
  } catch (e) {
    console.error("error:", e.errorMessage);
  }
}
