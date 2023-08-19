const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  id: Number,
  name: String,
  message: String,
  gender: String,
  country: String,
  creationDate: String,
  read: String,
});

module.exports = mongoose.model("Message", messageSchema);
