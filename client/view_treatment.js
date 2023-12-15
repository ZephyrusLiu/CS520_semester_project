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
                    <p>Heart Rate: ${record.heart_rate}</p>
                    <p>Oximetry: ${record.oximetry}</p>
                    <p>High Blood Pressure: ${record.h_blood}</p>
                    <p>High Blood Pressure: ${record.l_blood}</p>
                    <p>Record: ${record.record}</p>
                    <!-- Add more details as needed -->
                `;

                listItem.appendChild(recordDetails);
                listGroup.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching treatment records:', error));
}

function DataVisualization() {
    const patientId = getQueryParam('patient_id');
    let hr = [];
    let oxi = [];
    let highpre = [];
    let lowpre = [];

    if (patientId) {
        fetch(`/get_treatment_records?patient_id=${patientId}`)
            .then(response => response.json())
            .then(treatmentRecords => {
                treatmentRecords.forEach(record => {
                    hr.push(record.heart_rate);
                    oxi.push(record.oximetry);
                    highpre.push(record.h_blood);
                    lowpre.push(record.l_blood);
                });
                generateLinePlot(hr, oxi, highpre, lowpre);
            });

    } else {
        console.error('Patient ID not found in the URL.');
    }
};


function generateLinePlot(hr, oxi, highpre, lowpre) {
    // Create traces for each array
    const trace1 = {
        x: Array.from({ length: hr.length }, (_, i) => i + 1),
        y: hr,
        type: 'scatter',
        mode: 'lines',
        name: 'Heart Rate'
    };
    const trace2 = {
        x: Array.from({ length: oxi.length }, (_, i) => i + 1),
        y: oxi,
        type: 'scatter',
        mode: 'lines',
        name: 'Oximetry'
    };
    const trace3 = {
        x: Array.from({ length: highpre.length }, (_, i) => i + 1),
        y: highpre,
        type: 'scatter',
        mode: 'lines',
        name: 'High Blood Pressure'
    };
    const trace4 = {
        x: Array.from({ length: lowpre.length }, (_, i) => i + 1),
        y: lowpre,
        type: 'scatter',
        mode: 'lines',
        name: 'Low Blood Pressure'
    };
    const layout = {
        title: 'Patient Treatment Records',
        xaxis: { title: 'Treatment Record Index' },
        yaxis: { title: 'Value' }
    };

    Plotly.newPlot('linePlotPopup', [trace1, trace2, trace3, trace4], layout);

    const popupWindow = window.open('', '_blank', 'width=600,height=400');
    popupWindow.document.write('<html><head><title>Line Plot Popup</title></head><body>');
    popupWindow.document.write('<div id="linePlotPopup"></div>');
    popupWindow.document.write('<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>');
    popupWindow.document.write('<script>Plotly.newPlot("linePlotPopup", ' + JSON.stringify([trace1, trace2, trace3, trace4]) + ', ' + JSON.stringify(layout) + ');</script>');
    popupWindow.document.write('</body></html>');
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

function goDashboard() {
    window.location.href = "./dashboard.html";
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

function goAddTreatment() {
    window.location.href = "./add_medical_his.html"
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
