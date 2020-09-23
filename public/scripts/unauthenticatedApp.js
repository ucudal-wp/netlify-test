import { html } from 'https://unpkg.com/lit-html?module';

import loginForm from './templates/loginForm.js';

const unauthenticatedApp = () => html`
  <h1>Log in to <strong>Netlify Demo</strong></h1>
  ${loginForm()}
`;

export default unauthenticatedApp;
