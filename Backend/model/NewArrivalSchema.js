const mongoose = require('mongoose')

const NewArrivalSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverImage: String,
    type: String,
    price: Number
})

const NewBook = mongoose.model('NewBook', NewArrivalSchema)

module.exports = NewBook