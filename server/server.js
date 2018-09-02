require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {Project} = require('./models/project');
var {authenticate} = require('./middleware/authenticate');
var cors = require('cors');
var corsOptions = {
    exposedHeaders: "*",
    credentials: true,
    origin: 'http://localhost:4200'
};

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors(corsOptions));

//
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header");
// header("Access-Control-Expose-Headers: X-Custom-header");
// header("X-Custom-header: $some data");



app.post('/projects', authenticate, (req, res) => {
    var project = new Project({
        task: req.body.task,
        hours: req.body.hours,
        minutes: req.body.minutes,
        _creator: req.user._id
    });

    project.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

/*
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});
*/

app.get('/projects', authenticate, (req, res) => {
    Project.find({
        _creator: req.user._id
    }).then((projects) => {
        res.send({projects});
    }, (e) => {
        res.status(400).send(e);
    })
});

/*
app.get('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });

});
*/

app.get('/projects/:id', authenticate, (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.findOne({
        _id: id,
        _creator: req.user._id
    }).then((project) => {
        if (!project) {
            return res.status(404).send();
        }
        res.send({project});
    }).catch((e) => {
        res.status(400).send(e);
    });

});

/*
app.delete('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});
*/
app.delete('/projects/:id', authenticate, (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((project) => {
        if (!project) {
            return res.status(404).send();
        }

        res.send({project});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/*
app.patch('/todos/:id', authenticate, (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(400).send();
        }

        res.send({todo})
    }).catch((e) => {
        res.status(400).send(e);
    })
});
*/

app.patch('/projects/:id', authenticate, (req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['task', 'hours', 'minutes']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Project.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    }, {$set: body}, {new: true}).then((project) => {
        if (!project) {
            return res.status(400).send();
        }
        res.send({project})
    }).catch((e) => {
        res.status(400).send(e);
    })
});


app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email, password}

app.post('/users/login', (req,res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.delete('/users/me/token', authenticate, (req,res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
