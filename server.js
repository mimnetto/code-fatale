//___________________
//Dependencies
//___________________
const express = require('express');
const mongoose = require ('mongoose');
const methodOverride  = require('method-override');
const session = require('express-session')

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

mongoose.set('useNewUrlParser',true);
mongoose.set('useCreateIndex',true);
mongoose.connect(MONGODB_URI)
.then(connection => {
  console.log('Connected to MongoDB DB')
})
.catch(error => {
console.log(error.message)
})

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));


// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings

// SECRET
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project


//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//ROUTES
const blogsController = require("./controllers/blogs_controller.js");
app.use("/blogs", blogsController);
const usersController = require("./controllers/users_controller.js");
app.use("/home", usersController);



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
