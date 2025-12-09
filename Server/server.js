require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const analyzeRoutes = require('./routes/analyze');
const hospitalRoutes = require('./routes/hospitals');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/hospitals', hospitalRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
