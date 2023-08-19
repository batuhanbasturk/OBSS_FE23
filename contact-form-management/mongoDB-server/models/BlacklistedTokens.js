const mongoose = require("mongoose");

const blacklistedTokensSchema = new mongoose.Schema({
  blacklistedTokens: String,
});

module.exports = mongoose.model("BlacklistedTokens", blacklistedTokensSchema);
