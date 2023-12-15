'use strict';

function getQueryParam(parameterName) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parameterName);
}

function fetchAndDisplayTreatmentRecords(patientId) {
    fetch(`/get_treatment_records?patient_id=${patientId}`)
        .then(response => response.json())
        .then(treatmentRecords => {
            const listGroup = document.querySelector('.list-group');
            listGroup.innerHTML = '';

            treatmentRecords.forEach(record => {
                const listItem = document.createElement('div');
                listItem.classList.add('list-group-item', 'list-group-item-action');

                const recordDetails = document.createElement('div');
                recordDetails.innerHTML = `
                    <p>Date: ${record.date}</p>
                    <p>Description: ${record.description}</p>
                    <!-- Add more details as needed -->
                `;

                listItem.appendChild(recordDetails);
                listGroup.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching treatment records:', error));
}


document.addEventListener('DOMContentLoaded', function () {
    const patientId = getQueryParam('patient_id');
    if (patientId) {
        fetchAndDisplayTreatmentRecords(patientId);
    } else {
        console.error('Patient ID not found in the URL.');
    }
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

function goViewPersonal() {
    window.location.href = "./view_personal.html";
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
