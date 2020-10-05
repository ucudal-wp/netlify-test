const { mongodb } = require('../connectors');

const mongodbUri = process.env.MONGODB_URI;

let cachedConnection = null;

const db = () => ({
  before: (handler, next) => {
    // Allow AWS Lambda to reuse cached DB connection between function invocations.
    handler.context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

    if (cachedConnection === null) {
      mongodb(mongodbUri)
        .then((connection) => {
          cachedConnection = connection;
          next();
        })
        .catch(next);
      return;
    }

    next();
  },
});

module.exports = db;
