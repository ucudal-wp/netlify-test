const { Todo } = require('../../../libs/models');

const create = async (text) => {
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
};

module.exports = create;
