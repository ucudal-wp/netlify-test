const jwt = require('jsonwebtoken');
const middy = require('@middy/core');

const { User } = require('../libs/models');
const { db } = require('../libs/middleware');

const jwtSecret = process.env.JWT_SECRET;

const sessionsHandler = async (event) => {
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

exports.handler = middy(sessionsHandler).use(db());
