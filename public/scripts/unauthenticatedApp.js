import { html } from 'https://unpkg.com/lit-html?module';

import login from './templates/login.js';
import router from './templates/router.js';

const routes = {
  '/login': login,
};

const unauthenticatedApp = () => html`${router(routes)}`;

export default unauthenticatedApp;
