"use strict";

const url = "http://localhost:3000/api/v1";

async function getUsersData() {
  try {
    const res = await fetch(`${url}/users`);
    const users = await res.json();
    const list = document.getElementById("js-tbody");

    users.userData.forEach((user) => {
      const addHtml = `
      <tr>
        <td class="name">${user.name}</td>
        <td class="email">${user.email}</td>
        <td class="age">${user.age}</td>
        <td class="telephone">${user.telephone}</td>
      </tr>
      `;
      list.insertAdjacentHTML("beforeend", addHtml);
    });
  } catch (e) {
    console.error("error:", e.message);
  }
}

window.onload = () => {
  getUsersData();
};
