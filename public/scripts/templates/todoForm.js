import { html, nothing } from 'https://unpkg.com/lit-html?module';

import { create as createTodo } from '../services/todos.js';

const todoForm = () => {
  const error = null;

  const submitHandler = async (event) => {
    event.preventDefault();

    const text = event.target.text.value;

    try {
      await createTodo(text);
    } catch (err) {
      // TODO: Render error.
    }
  };

  return html`
    <form @submit=${submitHandler}>
      <input name="text" type="text" />
      <button>Add</button>
      ${error ? html`<p>${error.message}</p>` : nothing}
    </form>
  `;
};

export default todoForm;
