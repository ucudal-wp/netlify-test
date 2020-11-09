const jwt = require('jsonwebtoken');

const { Todo, User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

let cachedDb = null;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return null;
    }

    throw err;
  }
};

exports.handler = async (event, context) => {
  // Allow AWS Lambda to reuse cached DB connection between function invocations.
  context.callbackWaitsForEmptyEventLoop = false;

  if (cachedDb === null) {
    cachedDb = await mongodb(mongodbUri);
  }

  const { body, headers } = event;

  const { authorization } = headers;
  if (!authorization) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'You must be logged in.' }),
    };
  }

  const [scheme, token] = authorization.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: `Unsupported authentication scheme: "${scheme}". Supported schemes: "Bearer".`,
      }),
    };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Invalid token.',
      }),
    };
  }

  const { sub: userId } = decoded;
  const user = await User.findById(userId);

  if (!user) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Invalid token.',
      }),
    };
  }

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
