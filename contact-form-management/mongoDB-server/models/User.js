const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  base64Photo: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
