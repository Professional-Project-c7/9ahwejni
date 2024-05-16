const { Message } = require('../Database/index');

const getMessages = async (req, res) => {
    try {
        const room = parseInt(req.query.room, 10) || 1; // Default to 'global' room with ID 1
        const messages = await Message.findAll({ where: { room } });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

const postMessage = async (req, res) => {
    try {
        const { content, senderId, room, timestamp } = req.body;
        const message = await Message.create({ content, senderId, room: parseInt(room, 10), timestamp });
        res.status(201).json(message);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
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
    deleteMessage
};
