const express = require('express');
const router = express.Router();

const { createRoom, getAllRoomsByUserId, addUserToRoom ,getRoomByName } = require('../controller/Room'); 

router.post('/', createRoom);
router.get('/:id', getAllRoomsByUserId);
router.post('/user', addUserToRoom);
router.get('/name', getRoomByName);

module.exports = router;