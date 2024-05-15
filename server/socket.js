const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const PORT = 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(bodyParser.json());

const sequelize = new Sequelize('sqlite::memory:'); // or use a persistent file storage

const Message = sequelize.define('Message', {
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync(); // This will create the table if it doesn't exist

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Error saving message' });
  }
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

  socket.on('send_message', async (data, callback) => {
    const { content, timestamp } = data;
    const message = {
      senderId: userId,
      content,
      timestamp: timestamp || new Date().toLocaleString(),
    };

    try {
      await Message.create(message);
    } catch (error) {
      console.error('Error saving message:', error);
    }

    if (data.recipientId && userSockets[data.recipientId]) {
      io.to(userSockets[data.recipientId]).emit('receive_message', message);
    } else {
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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
