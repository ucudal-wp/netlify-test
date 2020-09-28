const mongoose = require('mongoose');

const Todo = require('./Todo');

describe('Todo', () => {
  let todo;

  beforeEach(() => {
    todo = new Todo({
      text: 'Foo',
    });
  });

  test('is saved successfully', async () => {
    const savedTodo = await todo.save();
    expect(savedTodo).toMatchObject(todo);
  });

  describe('validation', () => {
    test('passes if all required fields are present', async () => {
      await todo.validate();
    });

    test('fails if text is empty', async () => {
      expect.assertions(2);

      todo.text = undefined;
      try {
        await todo.validate();
      } catch (err) {
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
        expect(err.errors.text).toBeDefined();
      }
    });
  });
});
