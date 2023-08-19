const mongoose = require("mongoose");

const lastIDSchema = new mongoose.Schema({
  user: Number,
  message: Number,
});

module.exports = mongoose.model("LastID", lastIDSchema);
