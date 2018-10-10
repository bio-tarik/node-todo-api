const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todosSeed = [
  { _id: new ObjectID(), text: 'First test todo' },
  {
    _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333,
  },
];

const usersSeed = [
  {
    _id: userOneId,
    email: 'a@b.com',
    password: 'userOnePass',
    tokens: [{
      access: 'auth',
      token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123'),
    }],
  },
  {
    _id: userTwoId,
    email: 'a@c.com',
    password: 'userTwoPass',
  },
];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todosSeed);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(usersSeed[0]).save();
    const userTwo = new User(usersSeed[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {
  todosSeed,
  populateTodos,
  usersSeed,
  populateUsers,
};
