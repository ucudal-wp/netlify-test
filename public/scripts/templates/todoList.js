import { html } from 'https://unpkg.com/lit-html?module';

import resolvePromise from '../directives/resolvePromise.js';
import {
  getAll as getAllTodos,
  remove as removeTodo,
} from '../services/todos.js';

const todoItem = (todo) => {
  const handleDeleteClick = async () => {
    await removeTodo(todo._id);
  };

  return html`<li>
    ${todo.text}
    <button @click=${handleDeleteClick}>X</button>
  </li>`;
};

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
