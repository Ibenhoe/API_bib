const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/Book');
const Author = require('./models/Author');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Verbonden met de database.');

        // Verwijder bestaande data
        await Book.deleteMany({});
        await Author.deleteMany({});
        console.log('Bestaande data verwijderd.');

        // Voeg test auteurs toe
        const authors = await Author.insertMany([
            { name: 'J.K. Rowling', birthDate: '1965-07-31' },
            { name: 'George R.R. Martin', birthDate: '1948-09-20' },
            { name: 'J.R.R. Tolkien', birthDate: '1892-01-03' },
        ]);
        console.log('Auteurs toegevoegd:', authors);

        
        const books = await Book.insertMany([
            { title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', publishedYear: 1997 },
            { title: 'A Game of Thrones', author: 'George R.R. Martin', publishedYear: 1996 },
            { title: 'The Hobbit', author: 'J.R.R. Tolkien', publishedYear: 1937 },
            { title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', publishedYear: 1998 },
            { title: 'A Clash of Kings', author: 'George R.R. Martin', publishedYear: 1998 },
        ]);
        console.log('Boeken toegevoegd:', books);

        console.log('Database succesvol gevuld met testdata!');
        process.exit(0); 
    } catch (error) {
        console.error('Fout bij het vullen van de database:', error);
        process.exit(1); 
    }
};

seedData();
