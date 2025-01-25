const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const medicationsRouter = require('./routes/medications.routes');
const remindersRouter = require('./routes/reminders.router');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend's URL
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationsRouter);
app.use('/api/reminders', remindersRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MedSafe API' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});