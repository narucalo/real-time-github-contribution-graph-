const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const cron = require('node-cron');
const { fetchGitHubEvents, processAndAggregateData } = require('./utils/githubHelpers');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A client connected via WebSocket');

    // Listen for disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Periodically poll GitHub for new contributions
cron.schedule('* * * * *', async () => {  // This runs every minute
    console.log('Polling GitHub for new contributions...');

    // Fetch and process GitHub events
    const username = 'your-github-username'; // Replace with your GitHub username
    const events = await fetchGitHubEvents(username);
    const aggregatedData = processAndAggregateData(events);

    // Broadcast the updated data to all connected clients
    io.emit('update', aggregatedData);
});

// GitHub webhook endpoint
app.post('/webhook', (req, res) => {
    console.log('Received GitHub webhook event');
    const events = req.body;

    // Process and aggregate the events
    const aggregatedData = processAndAggregateData(events);

    // Broadcast the updated data to all connected clients
    io.emit('update', aggregatedData);

    res.status(200).send('Webhook received');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
