"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("save").addEventListener("click", async () => {
    console.log("ok");
    const patient_id = document.getElementById("patient_id").value;
    const firstname = document.getElementById("first_Name").value;
    const lastname = document.getElementById("last_Name").value;
    const birthday = document.getElementById("birthday").value;
    const gender = document.getElementById("disabledSelect").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const e_phone = document.getElementById("e_phone").value;
    const e_email = document.getElementById("e_email").value;
    let has_insurance = false;
    if (document.getElementById("insurance").value == "on") {
      has_insurance = true;
    }

    const blood_type = document.getElementById("blood_type").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const medical_history = document.getElementById("medical_his").value;
    const family_mh = document.getElementById("family_disorder_his").value;
    const allergic = document.getElementById("allergic").value;
    const addition_info = document.getElementById("addition_info").value;

    if (!patient_id ||!firstname ||!lastname ||!birthday ||!gender ||!phone ||!email) {
      alert("Please fill out all required fields.");
    } else {
      const response = await fetch("/add_personal_info", {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          patient_id: patient_id,
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          gender: gender,
          phone: phone,
          email: email,
          e_phone: e_phone,
          e_email: e_email,
          has_insurance: has_insurance,

          blood_type: blood_type,
          height: height,
          weight: weight,
          medical_history: medical_history,
          family_mh: family_mh,
          allergic: allergic,
          addition_info: addition_info,
        }),
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next").addEventListener("click", async () => {
    location.href = "add_medical_his.html";
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

function goDashboard() {
  window.location.href = "./dashboard.html";
}

function signOut() {
  fetch(window.location.origin + "/logout")
    .then((response) => response.json())
    .then((data) => {});
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
