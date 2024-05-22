const express = require('express');
const { getMessages, postMessage, postAudioMessage, deleteMessage, upload } = require('../controller/messages');

const router = express.Router();

router.get('/:room', getMessages);
router.post('/', postMessage);
router.post('/audio', upload.single('audio'), postAudioMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
