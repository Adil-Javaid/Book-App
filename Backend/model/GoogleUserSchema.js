const mongoose = require('mongoose')

const GoogleUserSchema = new mongoose.Schema({
    googleId: String,
    displayName: String,
    email: String,
    image: String
})

const googleUserDB = new mongoose.model("Users", GoogleUserSchema)

module.exports = googleUserDB;