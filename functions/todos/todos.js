const middy = require('@middy/core');

const { authentication, db } = require('../../libs/middleware');
const { create, readAll } = require('./methods');

const todosHandler = async (event) => {
  if (event.httpMethod === 'GET') {
    return readAll(event);
  }

  if (event.httpMethod === 'POST') {
    return create(event);
  }

  return {
    statusCode: 400,
  };
};

exports.handler = middy(todosHandler).use([db(), authentication()]);
