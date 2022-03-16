require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const booksController = require('./controllers/books.js')



app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use('/books', booksController)

//Options provided to the connect method or not valid options
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true},
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

app.listen(process.env.PORT)