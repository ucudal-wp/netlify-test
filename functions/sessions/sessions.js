const { create } = require('./methods');
const { db } = require('../../libs/middleware');

const sessionsHandler = async (event) => {
  const { httpMethod: method } = event;

  if (method === 'POST') {
    const { username, password } = JSON.parse(event.body);
    return create(username, password);
  }

  return {
    statusCode: 400,
  };
};

exports.handler = db(sessionsHandler);
