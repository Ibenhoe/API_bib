const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');

const router = express.Router();

// Alle boeken ophalen
router.get('/', async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Max aantal resultaten
    const offset = parseInt(req.query.offset) || 0; // Startpunt in de lijst
    const { sortBy = 'title', order = 'asc' } = req.query; // Sorteerveld en volgorde

    try {
        // Vind boeken met offset, limit, en sortering
        const books = await Book.find()
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 }) // Sorteer oplopend/aflopend
            .skip(offset)
            .limit(limit);

        const total = await Book.countDocuments(); // Totaal aantal boeken

        res.json({
            total,
            limit,
            offset,
            sortBy,
            order,
            data: books,
        });
    } catch (error) {
        res.status(500).json({ error: 'Serverfout' });
    }
});


router.get('/search', async (req, res) => {
    const { title, author } = req.query;

    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' }; 
    if (author) query.author = { $regex: author, $options: 'i' }; 

    try {
        const books = await Book.find(query);
        res.json({
            total: books.length,
            data: books,
        });
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
