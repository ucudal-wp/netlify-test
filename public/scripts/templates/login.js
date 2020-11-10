import { html } from 'https://unpkg.com/lit-html?module';

import loginForm from './loginForm.js';

const login = () => html`
  <h1>Log in to <strong>Netlify Demo</strong></h1>
  ${loginForm()}
`;

export default login;
