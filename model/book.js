const mongoose = require('mongoose')
const {Schema} = mongoose

const booksSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    year: Number,
    quantity: Number,
    imageURL: String
})

const Book = mongoose.model('Book', booksSchema)
module.exports = Book