const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    birthDate: { type: Date },
});

module.exports = mongoose.model('Author', AuthorSchema);
