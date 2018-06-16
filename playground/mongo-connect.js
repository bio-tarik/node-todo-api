const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://172.17.0.2:27017/TodoApp', (err, client) => {
    if (err)
        return console.log('Unable to connect to MongoDb server');

    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err)
            console.log('Unable to insert Todo', err);

        console.log(JSON.stringify(result.ops, undefined, 4));
    });

    client.close();
});