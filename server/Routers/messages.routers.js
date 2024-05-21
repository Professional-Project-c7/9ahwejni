const express = require('express');
const router = express.Router();
const { getMessages, postMessage, deleteMessage, postAudioMessage, upload } = require('../controller/messages');

router.get('/:room', getMessages);
router.post('/', postMessage);
router.post('/audio', upload.single('file'), postAudioMessage);
router.delete('/:id', deleteMessage);

module.exports = router;
