const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load the HTML file for testing
const html = fs.readFileSync(path.resolve(__dirname, '../userinfo.html'), 'utf8');
const { window } = new JSDOM(html);
global.document = window.document;

// Load the JavaScript file for testing
require('../userinfo.js');

describe('userinfo.js', () => {
  it('should update local storage on save button click', async () => {
    // Simulate user filling out the form
    document.getElementById('first_Name').value = 'John';
    document.getElementById('last_Name').value = 'Doe';
    document.getElementById('birthday').value = '1990-01-01';
    document.getElementById('disabledSelect').value = 'Male';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('username').value = 'johndoe';
    document.getElementById('password').value = 'password123';
    document.getElementById('profile').value = 'A brief profile.';

    // Simulate user clicking the save button
    document.getElementById('savechanges').click();

    // Retrieve updated information from local storage
    const updatedInfo = JSON.parse(localStorage.getItem('currentDoctor'));

    expect(updatedInfo.firstname).toBe('John');
    expect(updatedInfo.lastname).toBe('Doe');
    expect(updatedInfo.birthday).toBe('1990-01-01');
    expect(updatedInfo.gender).toBe('Male');
    expect(updatedInfo.email).toBe('john.doe@example.com');
    expect(updatedInfo.username).toBe('johndoe');
    expect(updatedInfo.password).toBe('password123');
    expect(updatedInfo.profile).toBe('A brief profile.');
  });
});
