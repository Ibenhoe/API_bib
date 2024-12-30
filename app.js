const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Voor .env configuratie
const path = require('path');
const Book = require('./models/Book');
const Author = require('./models/Author');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start database en voeg testdata toe
const startDatabase = async () => {
    try {
        // Verbind met MongoDB Atlas
        const dbUri = process.env.DB_URI;
        if (!dbUri) throw new Error('DB_URI ontbreekt in .env bestand.');

        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Verbonden met MongoDB Atlas');

        // Controleer of de collecties leeg zijn en voeg testdata toe
        const bookCount = await Book.countDocuments();
        const authorCount = await Author.countDocuments();

        if (authorCount === 0) {
            await Author.insertMany([
                { name: 'J.K. Rowling', birthDate: '1965-07-31' },
                { name: 'George R.R. Martin', birthDate: '1948-09-20' },
                { name: 'J.R.R. Tolkien', birthDate: '1892-01-03' },
                { name: 'Stephen King', birthDate: '1947-09-21' },
                { name: 'Agatha Christie', birthDate: '1890-09-15' },
                { name: 'Dan Brown', birthDate: '1964-06-22' },
                { name: 'Roald Dahl', birthDate: '1916-09-13' },
                { name: 'Jules Verne', birthDate: '1828-02-08' },
                { name: 'Mark Twain', birthDate: '1835-11-30' },
                { name: 'Arthur Conan Doyle', birthDate: '1859-05-22' },
                { name: 'H.G. Wells', birthDate: '1866-09-21' },
                { name: 'Edgar Allan Poe', birthDate: '1809-01-19' },
                { name: 'Bram Stoker', birthDate: '1847-11-08' },
                { name: 'Mary Shelley', birthDate: '1797-08-30' },
                { name: 'H.P. Lovecraft', birthDate: '1890-08-20' },
            ]);
            console.log('Auteurs toegevoegd');
        }

        if (bookCount === 0) {
            await Book.insertMany([
                { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', publishedYear: 1997 },
                { title: 'A Game of Thrones', author: 'George R.R. Martin', publishedYear: 1996 },
                { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937 },
                { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', publishedYear: 1998 },
                { title: 'A Clash of Kings', author: 'George R.R. Martin', publishedYear: 1998 },
                { title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', publishedYear: 1999 },
                { title: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling', publishedYear: 2000 },
                { title: 'Harry Potter and the Order of the Phoenix', author: 'J.K. Rowling', publishedYear: 2003 },
                { title: 'Harry Potter and the Half-Blood Prince', author: 'J.K. Rowling', publishedYear: 2005 },
                { title: 'Harry Potter and the Deathly Hallows', author: 'J.K. Rowling', publishedYear: 2007 },
                { title: 'A Storm of Swords', author: 'George R.R. Martin', publishedYear: 2000 },
                { title: 'A Feast for Crows', author: 'George R.R. Martin', publishedYear: 2005 },
                { title: 'A Dance with Dragons', author: 'George R.R. Martin', publishedYear: 2011 },
                { title: 'The Fellowship of the Ring', author: 'J.R.R. Tolkien', publishedYear: 1954 },
                { title: 'The Two Towers', author: 'J.R.R. Tolkien', publishedYear: 1954 },
                { title: 'The Return of the King', author: 'J.R.R. Tolkien', publishedYear: 1955 },
            ]);
            console.log('Boeken toegevoegd');
        }

        console.log('Database succesvol gevuld met testdata!');
    } catch (err) {
        console.error('Fout bij het verbinden met de database:', err.message);
        process.exit(1); // Stop de applicatie als er een fout is
    }
};

startDatabase();

// Server starten
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
