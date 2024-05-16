const db = require('../Database/index'); // Assuming db exports the Sequelize connection and Notification model

module.exports = {
    // Function to add a new notification
    addOne: async function(req, res) {
        try {
            const notification = await db.Notification.create(req.body);
            res.status(201).json(notification);
        } catch (error) {
            console.error('Error adding notification:', error);
            res.status(500).json({ error: 'Failed to add notification' });
        }
    },

    // Function to get all notifications
    getAll: async function(req, res) {
        try {
            const notifications = await db.Notification.findAll();
            res.status(200).json(notifications);
        } catch (error) {
            console.error('Error getting notifications:', error);
            res.status(500).json({ error: 'Failed to retrieve notifications' });
        }
    },

    // Function to get a specific notification by ID
    selectOne: async function(req, res) {
        try {
            const notification = await db.Notification.findAll({ where: { coffeId: req.params.id } });
            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }
            res.status(200).json(notification);
        } catch (error) {
            console.error('Error getting notification:', error);
            res.status(500).json({ error: 'Failed to retrieve notification' });
        }
    },

    // Function to delete a notification by ID
    deleteOne: async function(req, res) {
        try {
            const result = await db.Notification.destroy({ where: { id: req.params.id } });
            if (result === 0) {
                return res.status(404).json({ error: 'Notification not found' });
            }
            res.status(204).end();
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ error: 'Failed to delete notification' });
        }
    },

    // Function to update a notification by ID
    updateOne: async function(req, res) {
        try {
            const notification = await db.Notification.findOne({ where: { id: req.params.id } });
            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }
            await notification.update(req.body);
            res.status(200).json(notification);
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).json({ error: 'Failed to update notification' });
        }
    }
};
