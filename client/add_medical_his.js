"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("complete").addEventListener("click", async () => {
    console.log("ok");
    const id = document.getElementById("id").value;
    const heart_rate = document.getElementById("heart_rate").value;
    const oximetry = document.getElementById("oximetry").value;
    const h_blood = document.getElementById("high_pressure").value;
    const l_blood = document.getElementById("low_pressure").value;
    const record = document.getElementById("record").value;

    const response = await fetch("/add_medical_his", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        id: id,
        heart_rate: heart_rate,
        oximetry: oximetry,
        h_blood: h_blood,
        l_blood: l_blood,
        record: record,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
      location.href = "dashboard.html";
      alert("You created a patient record!");
    }
  });
});

// NavBar functions
function goLogin() {
  window.location.href = "./login.html";
}

function goHome() {
  window.location.href = "./homepage.html";
}

function goSignUp() {
  window.location.href = "./signup.html";
}

function goAllPatients() {
  window.location.href = "./view_all_patients.html";
}

function goUserinfo() {
  window.location.href = "./userinfo.html";
}

function signOut() {
  fetch(window.location.origin + "/logout")
    .then((response) => response.json())
    .then((data) => { });
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  refreshSign();
}

function goPersonal() {
  const username = localStorage.getItem("username");
  if (username) {
    window.location.href = "./view_personal.html";
  } else {
    localStorage.setItem("nextPage", "profile.html");
    window.location.href = "./login.html";
  }
}

function refreshSign() {
  const username = localStorage.getItem("username");
  const signIn = document.getElementById("signIn");
  const signOut = document.getElementById("signOut");
  const loginName = document.getElementById("loginName");
  if (username) {
    signIn.classList.add("hidden");
    signOut.classList.remove("hidden");
    loginName.innerHTML = "Signed in as " + username;
  } else {
    signIn.classList.remove("hidden");
    signOut.classList.add("hidden");
    loginName.innerHTML = "";
  }
}

// Index functions
// window.onload = async function () {
//     localStorage.setItem('nextPage', './index.html');
//     refreshSign();

//     const dic = await fetch("dictionary.json");
//     window.dictionary = await dic.json();
//     const select = document.getElementById('where_you_lost');

//     for (const address of dictionary) {
//         const optionElement = document.createElement('option');
//         optionElement.value = address;
//         optionElement.text = address;
//         select.appendChild(optionElement);
//     }
// };
