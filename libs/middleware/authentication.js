const jwt = require('jsonwebtoken');

const { User } = require('../models');

const jwtSecret = process.env.JWT_SECRET;

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

const authentication = () => ({
  before: (handler, next) => {
    const { headers } = handler.event;

    const { authorization } = headers;
    if (!authorization) {
      handler.callback(null, {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'You must be logged in.' }),
      });
      return;
    }

    const [scheme, token] = authorization.split(' ');

    if (!/^Bearer$/i.test(scheme)) {
      handler.callback(null, {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: `Unsupported authentication scheme: "${scheme}". Supported schemes: "Bearer".`,
        }),
      });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      handler.callback(null, {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: 'Invalid token.',
        }),
      });
      return;
    }

    const { sub: userId } = decoded;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          handler.callback(null, {
            statusCode: 401,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              error: 'Invalid token.',
            }),
          });
          return;
        }

        next();
      })
      .catch(next);
  },
});

module.exports = authentication;
