const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connet to MongoDB
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/user', require('./routes/user'));
app.use('/form', require('./routes/form'));

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));