const mongoose = require("mongoose");

const profileSchema = new mongoose.Scehma({
  img: String,
  username: String,
  zodiacsign: String,
  mood: String,
  position: String,
  currentproject: String,
})

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
