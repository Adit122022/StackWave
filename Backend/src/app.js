require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db'); 


// Import Routes
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);



module.exports = app;
