const mongoose = require("mongoose");

const SellBookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  readOnlineURL: String,
  downloadURL: String,
  isTrending: Boolean,
});

const SellBook = mongoose.model("SellBook", SellBookSchema);

module.exports = SellBook;
