"use strict";

async function getUsersData() {
  const list = document.getElementById("js-tbody");
  const div = document.getElementById("div");
  try {
    const res = await fetch(`${url}/users`);
    const users = await res.json();

    if (users.userData.length > 0) {
      users.userData.forEach((user) => {
        const addHtml = `
      <tr>
        <td class="name">${user.name}</td>
        <td class="email">${user.email}</td>
        <td class="age">${user.age}</td>
        <td class="telephone">${user.telephone}</td>
        <td class="editBtn"><a href="signUp.html?id=${user.id}"><button>編集</button></a></td>
        <td class="deleteBtn"><button onclick="deleteId(${user.id})">削除</button></td>
      </tr>
      `;
        list.insertAdjacentHTML("beforeend", addHtml);
      });
    } else {
      div.style.display = "none";
      const noData = `
      <div class="nodata">
        <p>There is <span>no data</span> to display</p>
      </div>
      `;
      list.insertAdjacentHTML("beforeend", noData);
    }
  } catch (e) {
    console.error("error:", e.message);
  }
}

onload = () => {
  getUsersData();
};
