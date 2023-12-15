"use strict";

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("createAccount")
    .addEventListener("click", async () => {
      console.log("ok");
      const firstname = document.getElementById("first_Name").value;
      const lastname = document.getElementById("last_Name").value;
      const birthday = document.getElementById("birthday").value;
      const gender = document.getElementById("disabledSelect").value;
      const email = document.getElementById("email").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const profile = document.getElementById("profile").value;
      
      if (!firstname || !lastname || !birthday || !gender || !email || !password || !profile) {
        alert("Please fill out all required fields.");
      } else {
        const response = await fetch("/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            birthday: birthday,
            gender: gender,
            email: email,
            username: username,
            password: password,
            profile: profile,
          }),
        });
      }
      const check = await response.json();
      if (check) {
        alert("Username Already Existed!");
      } else {
        location.href = "homepage.html";
        alert("Sign Up Succeed!");
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

function signOut() {
  fetch(window.location.origin + '/logout')
    .then((response) => response.json())
    .then((data) => { });
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  refreshSign();
}

function goUserinfo() {
  window.location.href = "./userinfo.html";
}

function goPersonal() {
  const username = localStorage.getItem('username');
  if (username) {
    window.location.href = "./view_personal.html";
  } else {
    localStorage.setItem('nextPage', 'profile.html');
    window.location.href = "./login.html";
  }
}

function refreshSign() {
  const username = localStorage.getItem("username");
  const signIn = document.getElementById("signIn");
  const signOut = document.getElementById("signOut");
  const loginName = document.getElementById("loginName");
  if (username) {
    signIn.classList.add('hidden');
    signOut.classList.remove('hidden');
    loginName.innerHTML = 'Signed in as ' + username;
  } else {
    signIn.classList.remove('hidden');
    signOut.classList.add('hidden');
    loginName.innerHTML = '';
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



