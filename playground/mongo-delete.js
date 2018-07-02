const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) return console.log('Unable to connect to MongoDb server');

  console.log('Connected to MongoDb Server');
  const db = client.db('TodoApp');

  db.collection('Todos')
    .deleteMany({ text: 'typo typo' })
    .then((result) => {
      console.log(result);
    });

  db.collection('Todos')
    .deleteOne({ text: 'typo typo' })
    .then((result) => {
      console.log(result);
    });

  db.collection('Todos')
    .findOneAndDelete({ text: 'typo typo' })
    .then((result) => {
      console.log(result);
    });

  return db.close();
});
