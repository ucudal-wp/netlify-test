const greetingFns = [
  (name) => `Hello, ${name}!`,
  (name) => `Hey there, ${name}!`,
  (name) => `Hi, ${name}!`,
  (name) => `Howdy, ${name}!`,
  (name) => `<img src="x" onerror="alert('${name}')">`,
];

const getRandomGreetingFn = () =>
  greetingFns[Math.floor(Math.random() * greetingFns.length)];

exports.handler = function (event, context, callback) {
  const {
    queryStringParameters: { name },
  } = event;

  const greeting = getRandomGreetingFn()(name);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ greeting }),
  });
};
