const { ObjectId } = require('mongodb');
const { Todo } = require('./../server/models/todo');

const id = '5b449a85c3eadd1ae8ae5bd11';

if (!ObjectId.isValid(id)) {
  console.log('Id not valid');
}

Todo.find({
  _id: id,
}).then((todos) => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id,
}).then((todo) => {
  console.log('Todo', todo);
});

Todo.findById(id)
  .then((todo) => {
    if (!todo) {
      return console.log('Id not found');
    }

    return console.log('TodoById', todo);
  }).catch(err => console.log(err));
