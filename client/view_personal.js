'use strict';

function getQueryParam(parameterName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
}

function fetchAndDisplayPatientInfo(patientId) {
    fetch(`/get_patient_info?patient_id=${patientId}`) 
        .then(response => response.json())
        .then(data => {
            document.getElementById('patient_id').value = data.patient_id;
            document.getElementById('first_Name').value = data.firstname;
            document.getElementById('last_Name').value = data.lastname;
            document.getElementById('birthday').value = data.birthday;
            document.getElementById("disabledSelect").value = data.gender;
            document.getElementById('phone').value = data.phone;
            document.getElementById('email').value = data.email;
            document.getElementById('e_phone').value = data.e_phone;
            document.getElementById('e_email').value = data.e_email;
            document.getElementById('blood_type').value = data.blood_type;
            document.getElementById('height').value = data.height;
            document.getElementById('weight').value = data.weight;
            document.getElementById('medical_his').value = data.medical_history;
            document.getElementById('family_disorder_his').value = data.family_mh;
            document.getElementById('allergic').value = data.allergic;
            document.getElementById('addition_info').value = data.addition_info;
            document.getElementById('insurance').checked = data.has_insurance;
        })
        .catch(error => console.error('Error fetching patient information:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    const patientId = getQueryParam('patient_id');
    if (patientId) {
        fetchAndDisplayPatientInfo(patientId);
    } else {
        console.error('Patient ID not found in the URL.');
    }
});


function goViewTreatment() {
    const patientId = getQueryParam('patient_id');
    window.location.href = `./view_treatment.html?patient_id=${patientId}`;
  }  

function goViewHealth() {
    window.location.href = "./view_health.html";
}

function goHome() {
    window.location.href = "./homepage.html";
}

function goUserinfo() {
    window.location.href = "./userinfo.html";
}

function goDashboard() {
    window.location.href = "./dashboard.html";
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
