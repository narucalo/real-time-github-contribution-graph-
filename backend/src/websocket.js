const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();

// Set up server
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
    // Emit data updates (for demonstration purposes)
    setInterval(() => {
        socket.emit('update', { message: 'New contribution data available' });
    }, 5000);
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
