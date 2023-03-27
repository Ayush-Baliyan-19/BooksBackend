const express = require("express")
const { customAlphabet } = require("nanoid/async")
const { body, validationResult } = require("express-validator")
const Books = require("../Model/BooksModel")
const router = express.Router()
const SecretPhrase = process.env.SecretPhrase

router.get('/', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    try {
        let AllBooks = await Books.find();
        if (AllBooks.length > 0) {
            res.status(200).json({ Success: true, Books: AllBooks })
        }
        else {
            res.status(404).json({ Success: true, Message: "No books found" })
        }
    }
    catch (err) {
        res.status(200).json({ Success: false, "Error": err })
    }
})

router.get('/:id', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 })
], async (req, res) => {
    console.log(req.params)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }

    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    try {
        const BookFound = await Books.findOne({ id: req.params.id })
        if (BookFound) {
            res.status(200).json({ Success: true, Book: BookFound })
        }
        else {
            return res.status(400).json({ Success: false, Message: "Book not found with the given id" });
        }
    }
    catch (err) {
        return res.status(400).json({ Success: false, Error: err })
    }
})

router.post('/', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 }),
    body("Title", "The Title you entered is not valid").isString(),
    body("Author", "The Author you entered is not valid").isString(),
    body("Description", "The Description you entered is not valid").isString(),
    body("PublishedDate", "The Date you entered is not a valid date").isString()
], async (req, res) => {
    const { Title, Author, Description, PublishedDate } = req.body;
    // console.log(req.body)
    const errors = validationResult(req);
    // console.log(errors.array())
    if (!errors.isEmpty()) {
        const success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    try {
        const FindBook = await Books.findOne({ Title: Title })
        if (FindBook) {
            return res.status(200).json({ Success: false, Message: "The book you are trying to add is already present", "Book ID": FindBook.id })
        }
        const id = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 6)
        const Book = new Books({ Title, Author, Description, PublishedDate, id: await id() })
        // console.log(Book)

        await Book.save();
        // console.log(AddedBook)
        res.status(200).json({ Success: true, Message: "Book is successfuly saved to Database", "Book ID": Book.id })
    } catch (err) {
        // console.log("Here")
        res.status(400).json({ Success: false, Error: err })
    }
})
router.put('/:id', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 }),
    body("Title", "The Title you entered is not valid").isString(),
    body("Author", "The Author you entered is not valid").isString(),
    body("Description", "The Description you entered is not valid").isString(),
    body("PublishedDate", "The Date you entered is not a valid date").isString(),
], async (req, res) => {
    const { Title, Author, Description, PublishedDate } = req.body;
    // console.log(req.body)
    const { id } = req.params
    const errors = validationResult(req);
    // console.log(errors.array())
    if (!errors.isEmpty()) {
        const success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    try {
        const UpdateBook = await Books.findOneAndUpdate({ id: id }, {
            $set: { Title: Title, Author: Author, Description: Description, PublishedDate: PublishedDate }
        })
        if (!UpdateBook) {
            return res.status(200).json({ Success: false, Message: "The book you are trying to update is not found" })
        }
        console.log(UpdateBook)
        res.status(200).json({ Success: true, Message: "Book is successfuly Updated", "Book details": UpdateBook })
    } catch (err) {
        // console.log("Here")
        res.status(400).json({ Success: false, Error: err })
    }
})
router.delete('/:id', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 }),
], async (req, res) => {
    const { id } = req.params
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const success = false;
        return res.status(400).json({ success, errors: errors.array() });
    }
    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    try {
        const FindBook = await Books.findOneAndDelete({ "id": id })
        if (!FindBook) return res.status(400).json({ Success: false, Message: "The book you are trying to delete was not found in our database" })
        res.status(200).json({ Success: true, Message: `Book with the book id ${FindBook.id} and name ${FindBook.Title} was deleted` })
    } catch (err) {
        res.status(400).json({ Success: false, Error: err })
    }
})

router.post('/find', [
    body("Secret", "The secret you entered is not valid").isLength({ min: 28 }),
], async (req, res) => {
    
    const Title = req.query.Title;
    const Author = req.query.Author;
    const PublishedDate = req.query.PublishedDate;

    if (req.body.Secret != SecretPhrase) {
        return res.status(400).json({ success: false, error: "NOT ALLOWED , WRONG KEY DETECTED" });
    }
    const pages = req.query.pages;
    const filter = { $and: [] };
    if (Title) filter.$and.push({ Title: Title });
    if (Author) filter.$and.push({ Author: Author });
    if (PublishedDate) filter.$and.push({ PublishedDate: PublishedDate });
    // console.log(filter)
    const FilterBooks = await Books.find(filter).limit(pages).sort({Title:1,Author:1})
    // console.log(FilterBooks)
    if (FilterBooks.length===0) {
        return res.status(404).json({ Success: false, Message: "The books you are trying to find are not here" })
    }
    res.status(200).json({ Success: true, "Books": FilterBooks })
})

module.exports = router;