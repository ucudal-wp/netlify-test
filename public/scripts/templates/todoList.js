import { html } from 'https://unpkg.com/lit-html?module';

import resolvePromise from '../directives/resolvePromise.js';
import { getAll as getAllTodos } from '../services/todos.js';

const todoItem = (todo) => html`<li>${todo.text}</li>`;

const todoList = () => {
  const fetchTodos = async () => {
    const { data: todos } = await getAllTodos();

    if (todos.length === 0) {
      return html`<p>You don't have any todos!</p>`;
    }

    return html`<ul>
      ${todos.map(todoItem)}
    </ul>`;
  };

  return html`${resolvePromise(fetchTodos())}`;
};

export default todoList;
