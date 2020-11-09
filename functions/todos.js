const middy = require('@middy/core');

const { Todo } = require('../libs/models');
const { authentication, db } = require('../libs/middleware');

const todosHandler = async (event) => {
  const { body } = event;

  if (event.httpMethod === 'GET') {
    const todos = await Todo.find();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    };
  }

  if (event.httpMethod === 'POST') {
    const { text } = JSON.parse(body);

    const todo = new Todo({ text });
    await todo.save();

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add `Location` header with the URL of the created todo.
      },
      body: JSON.stringify(todo),
    };
  }

  return {
    statusCode: 400,
  };
};

exports.handler = middy(todosHandler).use([db(), authentication()]);
