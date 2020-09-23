const jwt = require('jsonwebtoken');

const { mongodb } = require('../libs/connectors');

const jwtSecret = process.env.JWT_SECRET;
const mongodbUri = process.env.MONGODB_URI;

// TODO: Move to real database.
const users = [
  {
    id: '123',
    username: 'olistic',
    password: '12345678',
  },
];

exports.handler = async (event) => {
  await mongodb(mongodbUri);

  const { body } = event;

  const { username, password } = JSON.parse(body);

  const foundUser = users.find((user) => user.username === username);
  if (!foundUser || foundUser.password !== password) {
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
