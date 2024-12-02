const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    genre: { type: String },
    available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Book', BookSchema);