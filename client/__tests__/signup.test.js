const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const { waitFor } = require('@testing-library/dom');

// Load the HTML file for testing
const html = fs.readFileSync(path.resolve(__dirname, '../signup.html'), 'utf8');
const { window } = new JSDOM(html);
global.document = window.document;

// Load the JavaScript file for testing
const signupScript = require('../signup.js');

describe('Signup.js', () => {
  it('should attach click event to "createAccount" button', async () => {
    const createAccountButton = document.getElementById('createAccount');

    await waitFor(() => {
      const clickEvent = createAccountButton.onclick;
      expect(clickEvent).toBeTruthy();

    });
  });
});
