"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve doctorInfo from local storage
  const doctorInfo = JSON.parse(localStorage.getItem('currentDoctor'));

  if (doctorInfo) {
    document.getElementById("first_Name").value = doctorInfo.firstname;
    document.getElementById("last_Name").value = doctorInfo.lastname;
    document.getElementById("birthday").value = doctorInfo.birthday;
    document.getElementById("disabledSelect").value = doctorInfo.gender;
    document.getElementById("email").value = doctorInfo.email;
    document.getElementById("username").value = doctorInfo.username;
    document.getElementById("password").value = doctorInfo.password;
    document.getElementById("profile").value = doctorInfo.profile;
  } else {
    console.error("Doctor information not found.");
  }

  document.getElementById("savechanges").addEventListener("click", async () => {
    const updatedInfo = {
      firstname: document.getElementById("first_Name").value,
      lastname: document.getElementById("last_Name").value,
      birthday: document.getElementById("birthday").value,
      gender: document.getElementById("disabledSelect").value,
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      profile: document.getElementById("profile").value
    };

    localStorage.setItem('currentDoctor', JSON.stringify(updatedInfo));

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
  fetch(window.location.origin + '/logout')
    .then((response) => response.json())
    .then((data) => { });
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  refreshSign();
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



