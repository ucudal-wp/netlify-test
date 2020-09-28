import { html } from 'https://unpkg.com/lit-html?module';

const todos = [
  {
    id: '123',
    text: 'Foo bar',
  },
  {
    id: '124',
    text: 'Bar baz',
  },
];

const todoList = () => {
  return html`
    <h1>TODO:</h1>
    <ul>
      ${todos.map((todo) => html`<li>${todo.text}</li>`)}
    </ul>
  `;
};

export default todoList;
