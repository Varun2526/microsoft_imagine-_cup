const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { initDatabase } = require('./lib/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const db = initDatabase();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'ConsentShield API is running' });
});

// Import handlers
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

// app.post('/api/register-consent'... removed placeholder ...

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
