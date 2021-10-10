"use strict";

const url = "http://localhost:3000/api/v1";

async function getUsersData() {
  const list = document.getElementById("js-tbody");
  const tr = document.getElementById("first-tr");
  try {
    const res = await fetch(`${url}/users`);
    const users = await res.json();
    // console.log(users);

    if (users.userData.length > 0) {
      users.userData.forEach((user) => {
        const addHtml = `
      <tr>
        <td class="name">${user.name}</td>
        <td class="email">${user.email}</td>
        <td class="age">${user.age}</td>
        <td class="telephone">${user.telephone}</td>
        <td><a href="edit.html?id=${user.id}"><button class="edit-btn">編集</button></a></td>
        <td><button class="delete-btn" onclick="deleteId(${user.id})">削除</button></td>
      </tr>
      `;
        list.insertAdjacentHTML("beforeend", addHtml);
      });
    } else {
      tr.style.display = "none";
      const noData = `
      <div class="nodata">
        <p>表示するデータがありません</p>
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
