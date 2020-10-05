//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride  = require('method-override');

//___________________
//Config
//___________________
const app = express ();
require('dotenv').config()
const db = mongoose.connection;

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//DATABASE
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
// Error / success
mongoose.connection.on("error", (err) =>
  console.log(
    err.message,
    " is Mongod not running?/Problem with Atlas Connection?"
  )
);
mongoose.connection.on("connected", () =>
  console.log("mongo connected: ", MONGODB_URI)
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
  session({
    secret: process.env.SECRET, //a random string
    resave: false,
    saveUninitialized: false
  })
)
//ROUTES
const blogsController = require("./controllers/blogs_controller.js");
app.use("/blogs", blogsController);



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
