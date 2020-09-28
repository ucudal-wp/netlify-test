import { html } from 'https://unpkg.com/lit-html?module';

import todoForm from './todoForm.js';
import todoList from './todoList.js';

const todos = () => html`
  <h1>TODO:</h1>
  ${todoList()} ${todoForm()}
`;

export default todos;
