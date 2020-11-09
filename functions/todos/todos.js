const { authentication, db } = require('../../libs/middleware');
const { create, readAll } = require('./methods');

const todosHandler = async (event) => {
  const { httpMethod: method } = event;

  if (method === 'GET') {
    return readAll();
  }

  if (method === 'POST') {
    const { text } = JSON.parse(event.body);
    return create(text);
  }

  return {
    statusCode: 400,
  };
};

exports.handler = db(authentication(todosHandler));
