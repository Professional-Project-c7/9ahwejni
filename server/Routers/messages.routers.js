const express = require('express');
const router = express.Router();

const { getMessages, postMessage,deleteMessage } = require('../controller/messages'); 


router.get('/:room',getMessages);
router.post('/', postMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
