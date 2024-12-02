const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

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

// Database connectie
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Verbonden met MongoDB'))
  .catch((err) => console.error('Fout bij verbinden met de database:', err));

// Server starten
app.listen(PORT, () => console.log(`Server draait op http://localhost:${PORT}`));
