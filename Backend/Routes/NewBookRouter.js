const express = require('express')
const router = express.Router()
const NewBook = require('../model/NewArrivalSchema')


router.get('/', async(req, res)=>{
    try{
        const books = await NewBook.find()
        res.json(books)
    }
    catch(err){
        res.status(401).json({message: err.message})
    }
})

router.post('/', async(req, res)=>{
    const newBooks = NewBook({
      title: req.body.title,
      author: req.body.author,
      coverImage: req.body.coverImage,
      type: req.body.type,
      price: req.body.price,
    });
    try{
        const newBookData = await newBooks.save()
        res.status(201).json(newBookData)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})


module.exports = router;