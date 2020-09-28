import { html } from 'https://unpkg.com/lit-html?module';

import resolvePromise from '../directives/resolvePromise.js';
import { getAll as getAllTodos } from '../services/todos.js';

const todoItem = (todo) => html`<li>${todo.text}</li>`;

const todoList = () => {
  const fetchTodos = async () => {
    const { data: todos } = await getAllTodos();
    return todos.map(todoItem);
  };

  return html`
    <h1>TODO:</h1>
    <ul>
      ${resolvePromise(fetchTodos())}
    </ul>
  `;
};

export default todoList;
