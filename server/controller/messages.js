const { Message, User } = require('../Database/index');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '../uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const getMessages = async (req, res) => {
  try {
    const roomId = parseInt(req.params.room, 10);
    const messages = await Message.findAll({
      where: { roomId },
      include: [{
        model: User,
        attributes: ['id', 'FirstName', 'LastName'],
      }],
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const postMessage = async (req, res) => {
  try {
    const { content, senderId, roomId, isAudio } = req.body;
    const parsedSenderId = parseInt(senderId, 10);
    const parsedRoomId = parseInt(roomId, 10);

    if (isNaN(parsedSenderId) || isNaN(parsedRoomId)) {
      return res.status(400).json({ error: 'Invalid senderId or roomId' });
    }

    const message = await Message.create({
      content,
      senderId: parsedSenderId,
      roomId: parsedRoomId,
      isAudio,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

const postAudioMessage = async (req, res) => {
  try {
    const { senderId, roomId } = req.body;
    const parsedSenderId = parseInt(senderId, 10);
    const parsedRoomId = parseInt(roomId, 10);
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    if (isNaN(parsedSenderId) || isNaN(parsedRoomId)) {
      return res.status(400).json({ error: 'Invalid senderId or roomId' });
    }

    const message = await Message.create({
      content: filePath,
      senderId: parsedSenderId,
      roomId: parsedRoomId,
      isAudio: true,
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error('Error sending audio message:', error);
    res.status(500).json({ error: 'Failed to send audio message' });
  }
};

const postImageMessage = async (req, res) => {
  try {
    const { senderId, roomId } = req.body;
    const parsedSenderId = parseInt(senderId, 10);
    const parsedRoomId = parseInt(roomId, 10);
    const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    if (isNaN(parsedSenderId) || isNaN(parsedRoomId)) {
      return res.status(400).json({ error: 'Invalid senderId or roomId' });
    }

    const message = await Message.create({
      content: filePath,
      senderId: parsedSenderId,
      roomId: parsedRoomId,
      isImage: true,
    });

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error('Error sending image message:', error);
    res.status(500).json({ error: 'Failed to send image message' });
  }
};




const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findOne({ where: { id } });

    if (message) {
      await message.destroy();
      res.status(200).json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};

module.exports = {
  getMessages,
  postMessage,
  postAudioMessage,
  postImageMessage,
  deleteMessage,
  upload,
};
