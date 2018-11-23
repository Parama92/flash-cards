const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        unique: true,
        required: "A word most be provided"
    }
})

module.exports = mongoose.model('Word', wordSchema)