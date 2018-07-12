const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b475b00ba283404565badac'


/*
var id = '5b47bb0db4157a56f6c0e0fdL';
if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos',todos)
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo',todo)
});


Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found')
    }
    console.log('Todo by Id',todo)
}).catch((e) => console.log(e));

*/

User.findById(id).then((user) => {
   if (!user) {
       return console.log('User not found')
   }
   console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));