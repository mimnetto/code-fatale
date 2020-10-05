const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  post: String,
  mood: String,
  img: String ,
  createdAt: { type: Date, default: Date.now },
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
