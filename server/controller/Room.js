const { Room, RoomUser, Message, User } = require('../Database/index');

const createRoom = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if a room with the same name already exists
        const existingRoom = await Room.findOne({ where: { name } });
        if (existingRoom) {
             res.json(existingRoom);
        }
        else{

            const room = await Room.create({ name });
            res.status(200).json(room);

        }

        // Create the new room
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: 'Failed to create room' });
    }
};

const getAllRoomsByUserId = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);

        const userRooms = await Room.findAll({
            include: [
                {
                    model: User,
                    where: { id: userId }
                },
                {
                    model: Message,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'FirstName', 'LastName']
                        }
                    ]
                }
            ]
        });

        res.status(200).json(userRooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
};

const addUserToRoom = async (req, res) => {
    try {
        const { roomId, userId } = req.body;

        const checkUser = await RoomUser.findOne({ where: { roomId, userId } });
        if (checkUser) {
            return res.status(200).json("user already added");
        } else {
            const roomUser = await RoomUser.create({ roomId, userId });
            res.status(201).json(roomUser);
        }
    } catch (error) {
        console.error('Error adding user to room:', error);
        res.status(500).json({ error: 'Failed to add user to room' });
    }
};
const getRoomByName = async (req, res) => {
    try {
        const { name } = req.query;
        const existingRoom = await Room.findOne({ where: { name } });

        if (existingRoom) {
           res.status(200).json(existingRoom);
        } else {
         res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Failed to fetch room' });
    }
};
module.exports = {
    createRoom,
    getAllRoomsByUserId,
    addUserToRoom, 
    getRoomByName
};
