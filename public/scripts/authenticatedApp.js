import { html } from 'https://unpkg.com/lit-html?module';

import todos from './templates/todos.js';
import { logOut } from './services/auth.js';

const authenticatedApp = () => html`
  ${todos()}
  <button @click=${logOut} type="button">Log Out</button>
`;

export default authenticatedApp;
