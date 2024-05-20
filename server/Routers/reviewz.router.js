const express = require('express');
const { createReviewz, getReviewzByReviewee, getReviewzByReviewer } = require('../controller/reviewz.controller');

const router = express.Router();

router.post('/', createReviewz);
router.get('/reviewee/:revieweeId', getReviewzByReviewee);
router.get('/reviewer/:reviewerId', getReviewzByReviewer);

module.exports = router;
