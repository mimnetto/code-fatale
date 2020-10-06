const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const bcrypt = require('bcrypt')


router.get('/home', (req, res)=> {
  User.find({}, (err, foundUser)=> {
    res.json(foundUser)
  })
})

//check if you're logged in
router.get('/checklogged', (req, res)=> {
  if(req.session.loggedin){
    User.findOne({username: req.session.username}, (err, user)=>{
      res.json(user)
    })
  } else {
          req.session.message = "login failed"
      res.json(req.session.message)
  }
})

router.post('/signup', (req, res)=> {
  const password = req.body.password
  const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const entryIntoMongo = {};
  entryIntoMongo.username = req.body.username;
  entryIntoMongo.password = passwordBcrypt;
  User.create(entryIntoMongo, (err, user)=> {
    req.session.message = '';
    req.session.username = user.username;
    req.session.loggedin = true;
    res.json(req.session.loggedin)
  })
})

module.exports = router;
