import { html } from 'https://unpkg.com/lit-html?module';

import notFound from './notFound.js';

const router = (routes) => {
  const route = routes[window.location.pathname] || notFound;
  return html`${route()}`;
};

export default router;
