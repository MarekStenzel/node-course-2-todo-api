const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*
Todo.remove({}).then((result) => {
    console.log(result);
});
*/
// Todo.findOneandRemove
// Todo.findbyIdandRemove

Todo.findByIdAndRemove('5b49016d39c8202b85280d0b').then((todo) => {
    console.log(todo);
});