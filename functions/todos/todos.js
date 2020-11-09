const { authentication, db } = require('../../libs/middleware');
const { create, readAll, remove } = require('./methods');

const todosHandler = async (event) => {
  const { httpMethod: method, path } = event;

  const revisedPath = path.replace(/\.netlify\/functions\/[^/]+/, '');
  const segments = revisedPath.split('/').filter(Boolean);

  if (method === 'GET') {
    return readAll();
  }

  if (method === 'POST') {
    const { text } = JSON.parse(event.body);
    return create(text);
  }

  if (method === 'DELETE' && segments.length === 1) {
    const id = segments[0];
    return remove(id);
  }

  return {
    statusCode: 400,
  };
};

exports.handler = db(authentication(todosHandler));
