const { mongodb } = require('../connectors');

const mongodbUri = process.env.MONGODB_URI;

let cachedConnection = null;

const db = (handler) => async (event, context) => {
  // Allow AWS Lambda to reuse cached DB connection between function invocations.
  context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

  if (cachedConnection === null) {
    const connection = await mongodb(mongodbUri);
    cachedConnection = connection;
  }

  return handler(event, context);
};

module.exports = db;
