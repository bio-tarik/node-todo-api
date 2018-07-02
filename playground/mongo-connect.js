const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) return console.log('Unable to connect to MongoDb server');

  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

  db.collection('Todos').insertOne({
    text: 'Something to do',
    completed: false,
  }, (errInsert, result) => {
    if (errInsert) console.log('Unable to insert Todo', err);

    console.log(JSON.stringify(result.ops, undefined, 4));
  });

  return client.close();
});
