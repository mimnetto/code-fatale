// //==========
// //Dependencies
// //==========
//   const express = require('express')
//   const Profile = require('../models/profiles.js')
//   const profiles = express.Router()

// //==========
// //GET Route
// //==========
//   profiles.get('/', (req.res) => {
//     Profile.find({}. (err, foundProfiles) => {
//       res.json(foundProfiles)
//     })
//   })

// //==========
// //POST Route
// //==========
//   profiles.post('/', (req, res) => {
//     Profile.create(req.body, (err, createdProfile) => {
//       Profile.find({}, (err, foundProfiles) => {
//         res.json(foundProfiles)
//       })
//     })
//   })

// //==========
// //PUT Route
// //==========
//   profiles.put('/:id', (req, res) => {
//     Profile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true },
//       {err, updateProfile) => {
//         if (err) {
//         } else {
//           Profile.find({}, (err, foundProfiles) => {
//             res.json(foundProfiles)
//           })
//         }
//       }
//     }
//   )
// })

// //==========
// //DELETE Route
// //==========
//   profiles.delete('/:id', (req, res) => {
//     Profile.findByIdAndRemove(req.params.id, (err,
//     deleteProfile) => {
//       Profile.find({}, (err, foundProfiles) => {
//         res.json(foundProfiles)
//       })
//     })
//   })

// //No SEED Route == Debating if we actually need one

// //No DROP Collection == Debating if we actually need one
