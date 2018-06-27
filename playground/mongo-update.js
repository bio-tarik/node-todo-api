const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err)
        return console.log('Unable to connect to MongoDb server');

    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        text: 'Something to do'
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    
    client.close();
});