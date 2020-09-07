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

  const { token } = data;

  // Store token in local storage.
  window.localStorage.setItem(tokenStorageKey, token);
};

const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');

const signInButton = document.querySelector('#sign-in');
signInButton.addEventListener('click', () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  signIn(username, password);
});
