const { mongodb } = require('../connectors');

const mongodbUri = process.env.MONGODB_URI;

let cachedDb = null;

const db = () => ({
  before: async (handler, next) => {
    // Allow AWS Lambda to reuse cached DB connection between function invocations.
    handler.context.callbackWaitsForEmptyEventLoop = false; // eslint-disable-line no-param-reassign

    if (cachedDb === null) {
      cachedDb = await mongodb(mongodbUri);
    }

    next();
  },
});

module.exports = db;
