const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

// TODO: Move to real database.
const users = [
  {
    id: '123',
    username: 'olistic',
    password: '12345678',
  },
];

exports.handler = (event, context, callback) => {
  const { body } = event;

  const { username, password } = JSON.parse(body);

  const foundUser = users.find((user) => user.username === username);
  if (!foundUser || foundUser.password !== password) {
    callback(null, {
      statusCode: 401,
      body: 'Invalid username/password combination',
    });
    return;
  }

  const token = jwt.sign({ sub: foundUser.id }, jwtSecret);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ token }),
  });
};
