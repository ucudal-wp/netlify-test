const { Todo } = require('../../../libs/models');

const remove = async (id) => {
  await Todo.deleteOne({ _id: id });
  return {
    statusCode: 204,
  };
};

module.exports = remove;
