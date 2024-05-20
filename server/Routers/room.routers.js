const express = require('express');
const router = express.Router();

const { createRoom, getAllRoomsByUserId, addUserToRoom } = require('../controller/Room'); 

router.post('/', createRoom);
router.get('/:id', getAllRoomsByUserId);
router.post('/user', addUserToRoom);

module.exports = router;