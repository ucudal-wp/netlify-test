import { html } from 'https://unpkg.com/lit-html?module';

import { logOut } from './services/auth.js';

const authenticatedApp = () => html`
  <button @click=${logOut} type="button">Log Out</button>
`;

export default authenticatedApp;
