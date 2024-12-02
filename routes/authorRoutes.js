const express = require('express');
const { body, validationResult } = require('express-validator');
const Author = require('../models/Author');

const router = express.Router();

// Alle auteurs ophalen
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Serverfout' });
    }
});

// Nieuwe auteur toevoegen
router.post(
    '/',
    [
        body('name').notEmpty().withMessage('Naam is verplicht'),
        body('birthDate').isISO8601().withMessage('Geboortedatum moet geldig zijn'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newAuthor = new Author(req.body);
            const savedAuthor = await newAuthor.save();
            res.status(201).json(savedAuthor);
        } catch (error) {
            res.status(500).json({ error: 'Serverfout' });
        }
    }
);

module.exports = router;
