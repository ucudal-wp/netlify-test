const { Todo } = require('../../../libs/models');

const readAll = async () => {
  const todos = await Todo.find();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todos),
  };
};

module.exports = readAll;
