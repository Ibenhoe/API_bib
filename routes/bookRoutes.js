const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');

const router = express.Router();

// Alle boeken ophalen
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Serverfout' });
    }
});

// Nieuw boek toevoegen
router.post(
    '/',
    [
        body('title').notEmpty().withMessage('Titel is verplicht'),
        body('author').notEmpty().withMessage('Auteur is verplicht'),
        body('publishedYear').isInt().withMessage('Jaar moet een getal zijn'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (error) {
            res.status(500).json({ error: 'Serverfout' });
        }
    }
);

module.exports = router;
