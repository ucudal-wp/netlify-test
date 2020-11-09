const jwt = require('jsonwebtoken');

const { User } = require('../../../libs/models');

const jwtSecret = process.env.JWT_SECRET;

const create = async (username, password) => {
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

module.exports = create;
