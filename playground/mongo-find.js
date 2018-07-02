const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) return console.log('Unable to connect to MongoDb server');

  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

  db.collection('Todos')
    .find({
      completed: false,
    }).toArray().then((docs) => {
      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));
    }, (errFind) => {
      console.log(`Unable to find any todos: ${errFind}`);
    });

  db.collection('Todos')
    .find()
    .count()
    .then((count) => {
      console.log(`Total todos amount: ${count}`);
    }, (errFind) => {
      console.log(`Unable to find any todos: ${errFind}`);
    });

  return client.close();
});
