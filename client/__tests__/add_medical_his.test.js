const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const { waitFor } = require('@testing-library/dom');

// Load the HTML file for testing
const html = fs.readFileSync(path.resolve(__dirname, '../add_medical_his.html'), 'utf8');
const { window } = new JSDOM(html);
global.document = window.document;

// Load the JavaScript file for testing
const addMedicalHisScript = require('../add_medical_his.js');

describe('add_medical_his.js', () => {
  it('should attach click event to "complete" button', async () => {
    const completeButton = document.getElementById('complete');

    await waitFor(() => {
      const clickEvent = completeButton.onclick;
      expect(clickEvent).toBeTruthy();
    });
  });
});
