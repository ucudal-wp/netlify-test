import { isAuthenticated } from './utils/auth.js';
import { logIn, logOut } from './services/auth.js';

const authenticatedApp = document.querySelector('#authenticated-app');
const unauthenticatedApp = document.querySelector('#unauthenticated-app');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorText = document.querySelector('#error');
const signInButton = document.querySelector('#sign-in');
const signOutButton = document.querySelector('#sign-out');

signInButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  try {
    await logIn(username, password);

    // Clear inputs and error.
    usernameInput.value = '';
    passwordInput.value = '';
    errorText.textContent = '';
  } catch (err) {
    errorText.textContent = err.message;
  }
});

signOutButton.addEventListener('click', logOut);

const renderApp = () => {
  if (isAuthenticated()) {
    authenticatedApp.style.display = 'block';
    unauthenticatedApp.style.display = 'none';
  } else {
    authenticatedApp.style.display = 'none';
    unauthenticatedApp.style.display = 'block';
  }
};

window.addEventListener('auth', renderApp);

renderApp();
