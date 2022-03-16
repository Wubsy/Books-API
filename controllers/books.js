const express = require('express')
const books = express.Router()
const Book = require('../model/book.js')
require("mongoose");
/*
books.get('/seed', (req, res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
    },
        {
            "title": "Tess the Wonder Dog",
            "description": "The tale of a dog who gets super powers",
            "year": 2007,
            "quantity": 3,
            "imageURL": "https://imgur.com/cEJmGKV.jpg"
        },
        {
            "title": "The Annals of Arathrae",
            "description": "This anthology tells the intertwined narratives of six fairy tales.",
            "year": 2016,
            "quantity": 8,
            "imageURL": "https://imgur.com/VGyUtrr.jpeg"
        },
        {
            "title": "W∀RP",
            "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
            "year": 2010,
            "quantity": 4,
            "imageURL": "https://imgur.com/qYLKtPH.jpeg"
        }])
        .then(successStatus => res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(failStatus => res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})*/

books.get('/', (req, res) => {
    Book.find()
        .then(foundBook => {
            res.json(foundBook)
        })
        .catch(() => {
            res.status(500).json({"status": "An error occurred getting list of books"})
        })
})

books.post('/', (req, res) => {
    Book.create({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL
    }, ).then(createdBook => {
        res.status(201).json(createdBook)
    }, err => res.status(500).json({"status": err.message}))
})

books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
        .then(foundBook => {
            res.json(foundBook)
        }, () => {
            res.status(500).json({"status": "An error occurred"})
        })
})

//Full update of document
books.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        quantity: req.body.quantity,
        imageURL: req.body.imageURL
    }, null, err => {
        if (err) {
            res.status(500).json({"status": "An error occurred"})
        } else {
            Book.findById(req.params.id)
                .then(updatedBook => {
                    res.json(updatedBook)
                }, error => {
                    res.status(500).json({"status": error.message})
                })
        }
    })
})

//Partial update of document
books.patch('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, doc) => {
        if(doc) {
            res.json(doc)
        } else {
            res.status(500).json({"status": err})
        }
    })
})

books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, null, (err, doc) => {
        if(doc != null) {
            res.json({"status": "Success"})
        } else {
            res.status(500).json({"status": "An error occurred"}) //This is not likely to be sent as long as the id is formatted correctly, regardless of if the document is in the collection
        }
    })
})


module.exports = books