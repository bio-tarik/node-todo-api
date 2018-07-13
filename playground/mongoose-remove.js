const { Todo } = require('./../server/models/todo');

Todo.remove({})
  .then((result) => {
    console.log(result);
  });

Todo.findByIdAndRemove('5b48cda28f2d957c9bad2794')
  .then((todo) => {
    console.log(todo);
  });
