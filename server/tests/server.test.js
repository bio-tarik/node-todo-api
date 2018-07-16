const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todosSeed = [
  { _id: new ObjectID(), text: 'First test todo' },
  {
    _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 333,
  },
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todosSeed);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text }).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch(e => done(e));

        return 'done';
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err) => {
        if (err) return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch(e => done(e));

        return 'done';
      });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return a todo doc', (done) => {
    request(app)
      .get(`/todos/${todosSeed[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todosSeed[0].text);
      })
      .end(done);
  });

  it('Should return an 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/fail-test')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    const hexId = todosSeed[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toBeFalsy();
            done();
          }).catch(e => done(e));
      });
  });

  it('Should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/fail-test')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('Should update the todo', (done) => {
    const hexId = todosSeed[0]._id.toHexString();
    const text = 'New text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed: true, text })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBeTruthy();
        expect(typeof res.body.todo.completedAt).toBe('number');
        done();
      })
      .catch(e => done(e));
  });

  it('Should clear completedAt when todo is not completed', (done) => {
    const hexId = todosSeed[1]._id.toHexString();
    const text = 'New text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({ completed: false, text })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBeFalsy();
        expect(res.body.todo.completedAt).toBeNull();
        done();
      })
      .catch(e => done(e));
  });
});
