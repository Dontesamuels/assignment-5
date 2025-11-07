// Load environment variables
require('dotenv').config();
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Custom middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
app.use(logger);

// Routes
const menuRoutes = require('./routes/menu');
app.use('/api/menu', menuRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Tasty Bites API');
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
