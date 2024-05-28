const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');
const fs = require('fs');

const PORT = 4001;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) { 
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const userSockets = {};
const connectedUsers = {};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

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

  socket.on('send_message', (data, callback) => {
    const { recipientId, content, roomId, isAudio, isImage } = data;
    const message = {
      senderId: userId,
      content,
      roomId: parseInt(roomId, 10) || 1,
      isAudio,
      isImage,
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

app.post('/api/messages/image', upload.single('image'), (req, res) => {
  try {
    const { senderId, roomId } = req.body;
    const filePath = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;

    const message = {
      senderId: parseInt(senderId, 10),
      roomId: parseInt(roomId, 10),
      content: filePath,
      isImage: true,
    };

    io.to(message.roomId).emit('receive_message', message);

    res.status(201).json({ success: true, filePath });
  } catch (error) {
    console.error('Error sending image message:', error);
    res.status(500).json({ error: 'Failed to send image message' });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
