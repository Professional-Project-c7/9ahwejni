const db = require('../Database/index');

module.exports = {
  createReview: async (req, res) => {
    try {
      
      const { userId, stars ,comment,prodId} = req.body;
      const review = await db.Review.create({ userId, stars ,comment,prodId});
      res.status(201).send(review);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await db.Review.findAll({
        // include: [db.User, db.Product]  // Including related user and product data
      });
      res.status(200).send(reviews);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getReviewsByProduct: async (req, res) => {
    try {
      const reviews = await db.Review.findAll({
        where: { prodId : req.params.prodId  },
        include: [db.User]
      });
      res.status(200).send(reviews);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updateReview: async (req, res) => {
    try {
      const { stars, comment } = req.body;
      const { reviewId } = req.params;
      const updatedReview = await db.Review.update({ stars, comment }, {
        where: { id: reviewId, userId: req.user.id }
      });

      if (updatedReview[0] === 1) {
        res.send('Review updated successfully.');
      } else {
        res.status(404).send('Review not found or you do not have permission to update this review.');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const result = await db.Review.destroy({
        where: { id: reviewId, userId: req.user.id }
      });

      if (result === 1) {
        res.send('Review deleted successfully.');
      } else {
        res.status(404).send('Review not found or you do not have permission to delete this review.');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};
