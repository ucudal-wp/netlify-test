const todos = [
  {
    id: '123',
    text: 'Foo bar',
  },
  {
    id: '124',
    text: 'Bar baz',
  },
];

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todos),
  };
};
