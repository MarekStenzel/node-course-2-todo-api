const mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    task: {
        type: String,
        required: false,
        trim: true
    },
    hours: {
        type: Number,
        required: true,
        integer: true,
        min: 0,
        max: 23
    },
    minutes: {
        type: Number,
        required: true,
        integer: true,
        min: 0,
        max: 59
    },
    dateStart: {
        type: Number,
        required: true,
        integer: true,
        min: 0
    },
    dateStop: {
        type: Number,
        required: true,
        integer: true,
        min: 0
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

var Project = mongoose.model('Project', ProjectSchema);


module.exports = {Project};
