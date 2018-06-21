const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err)
        return console.log('Unable to connect to MongoDb server');

    console.log('Connected to MongoDb Server');
    const db = client.db('TodoApp');

    //delete many
    db.collection('Todos')
        .deleteMany({text: 'typo typo'})
        .then((result) => {
            console.log(result);
        });

    //delete one
    db.collection('Todos')
        .deleteOne({text: 'typo typo'})
        .then((result) => {
            console.log(result);
        });

    //findOneAndDelete
    db.collection('Todos')
        .findOneAndDelete({text: 'typo typo'})
        .then((result) => {
            console.log(result);
        });

    db.close();
});