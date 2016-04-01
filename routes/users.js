const express = require('express');
const users = express.Router();
const usersDB = require('../db/users_pg');
const SECRET = process.env.SECRET;
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');


users.use(function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
});

users.get('/', (req, res) => {
  res.json({data: 'success'});
});

// users.get('/home', expressJWT({secret: SECRET}), (req, res) => {
//   console.log('im in the home')
//   console.log(req.user);
//   // console.log(token)()
//   // console.log(req);
//   // var decoded = jwt.decode(req.headers.authorization);
//   // console.log(decoded)
//   //  console.log('im decoded' + decoded)
//    res.json({data: 'Success'})
// })

users.post('/', usersDB.createUser, (req,res) => {
  console.log('getting to users path')
  res.status(201).json({data: 'success'})

});

users.post('/login', usersDB.loginUser, (req, res) => {
  console.log(res.rows);
  var token = jwt.sign(res.rows, SECRET)
  res.json({agent: res.rows, token: token })

});






module.exports = users;
