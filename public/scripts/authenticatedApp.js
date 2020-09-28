import { html } from 'https://unpkg.com/lit-html?module';

import todoList from './templates/todoList.js';
import { logOut } from './services/auth.js';

const authenticatedApp = () => html`
  ${todoList()}
  <button @click=${logOut} type="button">Log Out</button>
`;

export default authenticatedApp;
