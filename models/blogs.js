const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
  mood: String,
<<<<<<< HEAD
  img: String,
=======
  img: String ,
>>>>>>> fca5b1ead2f199e3527f0993504f437aa5e02e9e
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
