var express = require("express");
var Book = require("../models/book");
var router = express.Router();

router.get("/", async (req, res) => {
  console.log("getting all books");
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    book.title = req.body.title;
    book.author = req.body.author;
    book.category = req.body.category;
    const updatedBook = await book.save();
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
