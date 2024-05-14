const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Store user ID and socket mapping
const userSockets = {};
const connectedUsers = {}; // To keep track of connected users

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Receive user ID from the client
  const userId = socket.handshake.query.userId;
  if (userId) {
    console.log(`User ID: ${userId}`); // Log the user ID
    userSockets[userId] = socket.id;
    connectedUsers[userId] = true; // Mark user as connected

    // Join the global room
    socket.join('global');
  }

  socket.on('send_message', (data, callback) => {
    // Extract message data
    const { recipientId, content, timestamp } = data;
  
    // Create the complete message object
    const message = {
      senderId: userId,
      content,
      timestamp: timestamp || new Date().toLocaleString(), // Use provided timestamp or current time
    };
  
    const recipientSocketId = userSockets[recipientId];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('receive_message', message);
    } else {
      // Send message to all users in the global room
      io.to('global').emit('receive_message', message);
      callback('success');
    }
  });
  

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // Remove user ID and socket mapping upon disconnection
    for (const [key, value] of Object.entries(userSockets)) {
      if (value === socket.id) {
        delete userSockets[key];
        delete connectedUsers[key]; // Remove user from connected users list
        break;
      }
    }
  });
});

// Endpoint to check if a user is connected
app.get('/isConnected', (req, res) => {
  const userId = req.headers.userid; // Retrieve user ID from headers
  const isConnected = connectedUsers[userId]? true : false;
  res.json({ isConnected });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});