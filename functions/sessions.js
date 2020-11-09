const jwt = require('jsonwebtoken');

const { User } = require('../libs/models');
const { mongodb } = require('../libs/connectors');

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

let cachedDb = null;

exports.handler = async (event, context) => {
  // Allow AWS Lambda to reuse cached DB connection between function invocations.
  context.callbackWaitsForEmptyEventLoop = false;

  if (cachedDb === null) {
    cachedDb = await mongodb(mongodbUri);
  }

  const { body } = event;

  const { username, password } = JSON.parse(body);

  const foundUser = await User.findOne({ username });
  if (!foundUser || !(await foundUser.comparePassword(password))) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Invalid username/password combination.' }),
    };
  }

  const token = jwt.sign({ sub: foundUser.id }, jwtSecret);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  };
};
