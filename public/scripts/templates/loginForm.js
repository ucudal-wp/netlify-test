import { html, nothing } from 'https://unpkg.com/lit-html?module';

import { logIn } from '../services/auth.js';

const loginForm = () => {
  const error = null;

  const submitHandler = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
      await logIn(username, password);
    } catch (err) {
      // TODO: Render error.
    }
  };

  return html`
    <form @submit=${submitHandler}>
      <label for="username">
        Username:
        <input name="username" type="text" />
      </label>
      <label for="password">
        Password:
        <input name="password" type="password" />
      </label>
      <button>Log In</button>
      ${error ? html`<p>${error.message}</p>` : nothing}
    </form>
  `;
};

export default loginForm;
