const { Todo } = require('../libs/models');

const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async (event) => {
  await mongodb(mongodbUri);

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
    const { body } = event;

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
