const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverImage: String,
    readOnlineURL: String,
    downloadURL: String,
    isTrending: Boolean
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book