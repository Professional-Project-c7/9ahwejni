const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review.controller');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/product/:prodId', reviewController.getReviewsByProduct);
// router.get('/coffeeShop/:coffeeShopId', reviewController.getReviewsByCoffeeShop);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
