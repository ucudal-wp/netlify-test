import { html } from 'https://unpkg.com/lit-html?module';

import router from './templates/router.js';
import todos from './templates/todos.js';
import { logOut } from './services/auth.js';

const routes = {
  '/': todos,
};

const authenticatedApp = () => html`
  ${router(routes)}
  <button @click=${logOut} type="button">Log Out</button>
`;

export default authenticatedApp;
