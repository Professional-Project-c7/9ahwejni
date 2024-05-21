const express = require('express');
const path = require('path');
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
  const room = parseInt(socket.handshake.query.room, 10) || 1;

  if (userId) {
    console.log(`User ID: ${userId}, Room: ${room}`);
    userSockets[userId] = socket.id;
    connectedUsers[userId] = true;
    socket.join(room);
  }
  // socket.on('new_review', (review) => {
  //   io.to(roomId).emit('new_review', review);
  // });
  

  socket.on('send_message', (data, callback) => {
    const { recipientId, content, roomId, isAudio } = data;
    const message = {
      senderId: userId,
      content,
      roomId: parseInt(roomId, 10) || 1,
      isAudio
    };

    if (recipientId && userSockets[recipientId]) {
      io.to(userSockets[recipientId]).emit('receive_message', message);
    } else {
      socket.broadcast.to(message.roomId).emit('receive_message', message);
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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
