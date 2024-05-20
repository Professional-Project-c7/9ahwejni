const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const db = require('./Database/index'); // Ensure correct path to your Sequelize models

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
  const roomId = parseInt(socket.handshake.query.roomId, 10) || 1;

  if (userId) {
    console.log(`User ID: ${userId}, Room ID: ${roomId}`);
    userSockets[userId] = socket.id;
    connectedUsers[userId] = true;

    socket.join(roomId);

    socket.on('send_message', async (data, callback) => {
      const { content, timestamp } = data;
      try {
        const message = await db.Message.create({
          content,
          senderId: userId,
          roomId,
        });

        const fullMessage = {
          ...message.toJSON(),
          senderId: userId,
          timestamp: timestamp || new Date().toISOString(),
        };

        io.to(roomId).emit('receive_message', fullMessage);
        callback('success');
      } catch (error) {
        console.error('Error sending message:', error);
        callback('error');
      }
    });
  }
  // socket.on('new_review', (review) => {
  //   io.to(roomId).emit('new_review', review);
  // });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete userSockets[userId];
    delete connectedUsers[userId];
  });
});

app.use(express.json()); // Ensure express.json() is used to parse JSON bodies

app.get('/isConnected', (req, res) => {
  const userId = req.headers.userid;
  const isConnected = !!connectedUsers[userId];
  res.json({ isConnected });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
