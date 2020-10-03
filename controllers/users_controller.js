const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// gets the new user form
users.get('/new', (req, res) => {
  res.render('users/new.html', {
    currentUser: req.session.currentUser
  })
})

// create a new user
users.post('/', (req, res) => {
  // overwrite the password that the user entered
  // with the encypted bcrypt password
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/blogs')
  })
})

module.exports = users