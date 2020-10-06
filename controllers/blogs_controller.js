//==========
//Dependencies
//==========
  const express = require('express')
  const Blog = require('../models/blogs.js')
  const blogs = express.Router()
    // const blogSeed = require('../models/blog_seed.js')


//==========
//GET Route
//==========
//Index
  blogs.get('/', (req, res) => {
    Blog.find({}, (err, foundBlogs) => {
      res.json(foundBlogs)
    })
  })

//==========
//POST Route
//==========
//Create
  blogs.post('/', (req, res) => {
    Blog.create(req.body, (err, createdBlog) => {
      Blog.find({}, (err, foundBlogs) => {
        res.json(foundBlogs)
      })
    })
  })


//==========
//PUT Route
//==========
//Update
    blogs.put('/:id', (req, res) => {
      Blog.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, updateBlog) => {
          if (err) {
            res.send(err)
          } else {
            Blog.find({}, (err, foundBlogs) => {
          res.json(foundBlogs)
        })
      }
    }
  )
})

//==========
//DELETE Route
//==========
    blogs.delete('/:id', (req, res) => {
      Blog.findByIdAndRemove(req.params.id, (err,
      deletedBlog) => {
        Blog.find({}, (err, foundBlogs) => {
          res.json(foundBlogs)
        })
      })
    })

//==========
//Sessions
//==========
// blogs.get('/sessions', (req, res) => {
//     //any route will work
//     if (req.session.anyProperty === 'hello world') {
//         console.log('it matches! cool')
//     } else {
//         //do something else if it's not
//         console.log('nope, not a match')
//       }
//       res.redirect('/')
//   })

//   app.get('/update', (req, res) => {
//     //any route will work
//     req.session.anyProperty = 'hello world'
//     res.redirect('/')
//   })

//==========
//SEED Route
//==========
// blogs.get('/seed', (req, res) => {
//   Blog.insertMany(blogSeed, (err, manyBlogs) => {
//     res.redirect('/')
//   })
// })

//==========
//DROP Collection
//==========
    // blogs.get('/dropcollection', (req, res) => {
    //   Blog.collection.drop()
    //   res.redirect('/')
    // })


module.exports = blogs
