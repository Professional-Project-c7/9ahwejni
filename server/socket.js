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

const userSockets = {};
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) {
    console.log(`User ID: ${userId}`);
    userSockets[userId] = socket.id;
    connectedUsers[userId] = true;

    socket.join('global');
  }

  socket.on('send_message', (data, callback) => {
    const { recipientId, content, timestamp } = data;
    const message = {
      senderId: userId,
      content,
      timestamp: timestamp || new Date().toLocaleString(),
    };

    if (recipientId && userSockets[recipientId]) {
      // Send the message only to the recipient
      io.to(userSockets[recipientId]).emit('receive_message', message);
    } else {
      // If recipientId is not provided, broadcast to all except the sender
      socket.broadcast.to('global').emit('receive_message', message);
    }

    callback('success');
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const [key, value] of Object.entries(userSockets)) {
      if (value === socket.id) {
        delete userSockets[key];
        delete connectedUsers[key];
        break;
      }
    }
  });
});

app.get('/isConnected', (req, res) => {
  const userId = req.headers.userid;
  const isConnected = !!connectedUsers[userId];
  res.json({ isConnected });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});