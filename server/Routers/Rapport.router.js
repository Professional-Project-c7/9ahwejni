const express = require('express');
const router = express.Router();
const rapportController = require('../controller/Rapport');

router.post('/', rapportController.createRapport);
router.get('/', rapportController.getAllRapprt);
// router.get('/product/:prodId', reviewController.getReviewsByProduct);
// router.get('/coffeeShop/:coffeeShopId', reviewController.getReviewsByCoffeeShop);
// router.put('/:reviewId', reviewController.updateReview);
// router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
