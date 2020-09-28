const { Todo } = require('../libs/models');

const { mongodb } = require('../libs/connectors');

const mongodbUri = process.env.MONGODB_URI;

exports.handler = async () => {
  await mongodb(mongodbUri);

  const todos = await Todo.find();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todos),
  };
};
