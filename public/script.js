const tokenStorageKey = 'token';
const sessionsServiceUrl = '/.netlify/functions/sessions';

const signIn = async (username, password) => {
  const res = await fetch(sessionsServiceUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.error);
  }

  const { token } = data;

  // Store token in local storage.
  window.localStorage.setItem(tokenStorageKey, token);
};

const isAuthenticated = () => !!window.localStorage.getItem(tokenStorageKey);

const authenticatedApp = document.querySelector('#authenticated-app');
const unauthenticatedApp = document.querySelector('#unauthenticated-app');

const renderApp = () => {
  if (isAuthenticated()) {
    authenticatedApp.style.display = 'block';
    unauthenticatedApp.style.display = 'none';
  } else {
    authenticatedApp.style.display = 'none';
    unauthenticatedApp.style.display = 'block';
  }
};

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const errorText = document.querySelector('#error');
const signInButton = document.querySelector('#sign-in');
signInButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  try {
    await signIn(username, password);

    // Clear inputs and error.
    usernameInput.value = '';
    passwordInput.value = '';
    errorText.textContent = '';

    // Re-render app.
    renderApp();
  } catch (err) {
    errorText.textContent = err.message;
  }
});

const signOutButton = document.querySelector('#sign-out');
signOutButton.addEventListener('click', () => {
  window.localStorage.removeItem(tokenStorageKey);

  // Re-render app.
  renderApp();
});

renderApp();
