require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const websocket = require('./websocket');
const { createServer } = require('http');

// Initialize Express
const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Import contributionRoutes after other setup is done
const contributionRoutes = require('./routes/contributionRoutes');

// API Routes
app.use('/api/contributions', contributionRoutes);

// Initialize WebSocket
websocket(httpServer);

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Module export at the end
module.exports = {
  contributionRoutes 
};

console.log(__dirname) or console.log(process.cwd())