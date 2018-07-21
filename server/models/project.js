const mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    hours: {
        type: Number,
        required: true,
        min: 0
    },
    minutes: {
        type: Number,
        required: true,
        min: 0,
        max: 59
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

var Project = mongoose.model('Project', ProjectSchema);


module.exports = {Project};
