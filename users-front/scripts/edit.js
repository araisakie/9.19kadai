"use strict";

const url = "http://localhost:3000/api/v1";

async function edit(id) {
  try {
    const res = await fetch(`${url}/users/${id}`);

    const selectedData = await res.json();

    document.getElementById("name").value = selectedData.searchData.name;
    document.getElementById("email").value = selectedData.searchData.email;
    document.getElementById("age").value = selectedData.searchData.age;
    document.getElementById("telephone").value =
      selectedData.searchData.telephone;
  } catch (e) {
    console.error("error:", e.errorMessage);
  }
}

onload = () => {
  const param = location.search;

  if (param) {
    const id = param.slice(4);
    edit(id);
  }
};
