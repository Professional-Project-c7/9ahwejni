const express = require('express');
const router = express.Router();
const packReviewController = require('../controller/packreview.controller');

router.get('/', packReviewController.getAllReviews);
router.get('/:id', packReviewController.getReviewById);
router.post('/', packReviewController.addReview);
router.delete('/:id', packReviewController.deleteReview);
router.patch('/:id', packReviewController.updateReview);

module.exports = router;
