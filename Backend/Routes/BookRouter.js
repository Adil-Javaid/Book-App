const express = require('express')
const router = express.Router()
const Book = require('../model/BookSchema')

router.get("/", async(req, res)=>{
    try{
        const bookTrending = await Book.find({isTrending: true})
        res.json(bookTrending)
    }
    catch(err){
        res.status(401).json({message: err.message})
    }
})


router.post("/", async (req, res) => {
  const newBook = Book({
    title: req.body.title,
    author: req.body.author,
    coverImage: req.body.coverImage,
    readOnlineURL: req.body.readOnlineURL,
    downloadURL: req.body.downloadURL,
    isTrending: req.body.isTrending,
  });

  try {
    const bookData = await newBook.save();
    res.status(201).json(bookData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router