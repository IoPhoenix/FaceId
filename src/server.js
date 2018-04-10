/* Express is a light-weight web application framework
  to help organize web app on the server side */
  const express = require('express');
  const app = express();
  
  /* Parse incoming request bodies in a middleware before 
  the handlers, available under the req.body property */
  const bodyParser = require('body-parser');
  
  // to enable CORS:
  const cors = require('cors');
  const bcrypt = require('bcrypt-nodejs');
  
  // Knex is an SQL query builder
  const knex = require('knex');
  
  const db = knex({
      client: 'pg',
      connection: {
        host : '127.0.0.1', // localhost
        user : 'olga',
        password : '',
        database : 'faceid' // < createdb 'faceid'
      }
  });
  
  
  app.use(bodyParser.json());
  app.use(cors());
  
  // const databaseStructureExample = {
  //     users: [
  //         {
  //             id: '123',
  //             name: 'John',
  //             email: "john@gmail.com",
  //             entries: 0,
  //             joined: new Date()
  //         }
  //     ], 
  //     login: [
  //         {
  //             email: "john@gmail.com",
  //             password: 'cookies'
  //         }
  //     ]
  // }
  
  // root route
  app.get('/', (req, res) => {
      res.send(database.users);
  })
  
  //  signin: check existing user info
  app.post('/signin', (req, res) => {
      db.select('email', 'hash').from('login')
      .where('email', '=', req.body.email)
      .then(data => {
          //compare entered password with hashed password in database 
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
          return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('Cannot get user'));
        } else {
          res.status(400).json('Wrong credentials');
        }
      })
       .catch(err => res.status(400).json('Wrong credentials'));
  });
  
  
  // register: post new user info
  app.post('/register', (req, res) => {
      const { email, password, name} = req.body;
      const hash = bcrypt.hashSync(password);
  
      /* All queries within a transaction are executed 
      on the same database connection, and run the entire 
      set of queries as a single unit of work. Any failure 
      will mean the database will rollback any queries executed 
      on that connection to the pre-transaction state.*/
  
      // store user email and hashed password into login table
      db.transaction(trx => {
          trx.insert({
            hash: hash,
            email: email
          })
          .into('login')
          .returning('email')
  
          // then store other user details into users table
          .then(loginEmail => {
              return trx('users')
                .returning('*')
                .insert({
                  email: loginEmail[0],
                  name: name,
                  joined: new Date()
                })
                // return user info
                .then(user => {
                  res.json(user[0]);
                })
            })
            // if everyting went well, send this transaction through
            .then(trx.commit)
            //rollback will return a rejected Promise
            .catch(trx.rollback)
          })
          .catch(err => res.status(400).json('Cannot register a new user'));
  });
  
  
  // profile: get user info from database
  app.get('/profile/:id', (req, res) => {
      const { id } = req.params;
  
      db.select('*').from('users').where({id})
        .then(user => {
          if (user.length) {
            res.json(user[0])
          } else {
            res.status(400).json('User not found')
          }
        })
        .catch(err => res.status(400).json('Error getting user'))
  })
  
  
  // image: inscrese # of checked images from a certain user
  app.put('/image', (req, res) => {
      const { id } = req.body;
      
      db('users')
          .where('id', '=', id)
          .increment('entries', 1)
          .returning('entries')
          .then(entries => {
              res.json(entries[0]);
          })
          .catch(err => res.status(400).json('Cannot get entries'))
    ;
  })
  
  app.listen(3000, () => {
      console.log('App is running');
  });