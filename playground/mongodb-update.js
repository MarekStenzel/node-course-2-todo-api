//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');
/*
    db.collection('Todos').findOneAndUpdate({
      _id: new ObjectID('5b46154db631ff16c92c0335')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
       console.log(result);
    });
*/
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b44f9a7d38ef2739d777d71')
    }, {
        $set: {
            name: 'Markos'
        },
        $inc: {
            age: -1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
//    client.close();
});