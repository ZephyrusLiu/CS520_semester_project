const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Load the HTML file for testing
const html = fs.readFileSync(path.resolve(__dirname, '../login.html'), 'utf8');
const { window } = new JSDOM(html);
global.document = window.document;

// Load the JavaScript file for testing
const loginScript = require('../login.js');

describe('login.js', () => {
  // it('should attach click event to "login" button', async () => {
  //   const signinButton = document.getElementById('login');

  //   // Wait for the click event to be attached
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 0);
  //   });

  //   const clickEvent = signinButton.onclick;

  //   expect(clickEvent).toBeTruthy();
  // });

  it('should handle sign-in click and save doctor info on success', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({doctorInfo}),
    });
    

    // Mock the localStorage functions
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
    global.localStorage = localStorageMock;

    // Mock the window.location.href and alert functions
    const locationMock = { href: '' };
    global.window = { location: locationMock, alert: jest.fn() };

    // Simulate the click event on the signin button
    const signinButton = document.getElementById('signin');
    await signinButton.click();

    // Verify that the fetch function was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        username: '',
        password: '',
      }),
    });

    // Verify the localStorage functions were called with the correct arguments
    expect(localStorageMock.setItem).toHaveBeenCalledWith('currentDoctor', JSON.stringify({ /* Sample doctorInfo */ }));

    // Verify the console.log was called
    expect(console.log).toHaveBeenCalledWith('Save successfully');

    // Verify the window.location.href was set to "dashboard.html"
    expect(locationMock.href).toBe('dashboard.html');
  });
});
