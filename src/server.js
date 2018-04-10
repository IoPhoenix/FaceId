const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const app = express();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1', // localhost
      user : 'olga',
      password : '',
      database : 'faceid'
    }
});

db.select('*').from('users').then(d => console.log(d));

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: "john@gmail.com",
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: "sally@gmail.com",
            password: 'banana',
            entries: 0,
            joined: new Date()
        }
    ]
}

// root route
app.get('/', (req, res) => {
    res.send(database.users);
})

//  signin: check existing user info
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

// register: post new user info
app.post('/register', (req, res) => {
    const { email, password, name} = req.body;
    db('users')
        .returning('*')
        .insert({
            name: name,
            email: email,
            joined: new Date() 
        }).then(user => {
            res.json(user[0]);
        }).catch(err => res.status(400).json('Cannot register'));
});

// profile: get user info from database
app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) res.status(404).json('no such user');
})

// image: inscrese # of checked images for a user
app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found) res.status(404).json('no such user');
})

app.listen(3000, () => {
    console.log('app is running');
})