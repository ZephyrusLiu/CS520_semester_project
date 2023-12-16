const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const { fireEvent } = require('@testing-library/dom');

// Load the HTML file for testing
const html = fs.readFileSync(path.resolve(__dirname, '../add_personal_info.html'), 'utf8');
const { window } = new JSDOM(html);
global.document = window.document;

// Load the JavaScript file for testing
require('../add_personal_info.js');

describe('add_personal.js', () => {
  it('should handle "save" button click event', async () => {
    document.getElementById('patient_id').value = '123';
    document.getElementById('first_Name').value = 'John';
    document.getElementById('last_Name').value = 'Doe';

    const saveButton = document.getElementById('save');
    fireEvent.click(saveButton);
  });
});
