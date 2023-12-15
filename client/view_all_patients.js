'use strict';

fetch("/view_all_patients")
  .then(response => response.json())
  .then(data => {
    const listGroup = document.querySelector('.list-group');
    listGroup.innerHTML = '';

    data.forEach(patient => {
      const listItem = document.createElement('a');
      listItem.href = "#";
      listItem.classList.add('list-group-item', 'list-group-item-action');
      listItem.textContent = `${patient.firstname} ${patient.lastname}, ${patient.phone}, ${patient.email}`;
      listGroup.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching patient data:', error));

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

function signOut() {
  fetch(window.location.origin + '/logout')
    .then((response) => response.json())
    .then((data) => { });
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  refreshSign();
}

function goAllPatients() {
  window.location.href = "./view_all_patients.html";
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
