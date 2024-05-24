const db = require('../Database/index');

module.exports = {
  getAllReviews: async (req, res) => {
    try {
      const reviews = await db.PackReview.findAll({
        include: {
          model: db.User,
          attributes: ['firstName', 'lastName', 'imageUrl']
        }
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).send(error);
    }
  },

  getReviewById: async (req, res) => {
    try {
      const review = await db.PackReview.findOne({
        where: { id: req.params.id },
        include: {
          model: db.User,
          attributes: ['firstName', 'lastName', 'imageUrl']
        }
      });
      res.status(200).json(review);
    } catch (error) {
      console.error('Error fetching review:', error);
      res.status(500).send(error);
    }
  },

  addReview: async (req, res) => {
    try {
      const { stars, comment, packId, userId } = req.body;
      const review = await db.PackReview.create({ stars, comment, packId, userId });
      res.status(201).json(review);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).send(error);
    }
  },

  deleteReview: async (req, res) => {
    try {
      const result = await db.PackReview.destroy({ where: { id: req.params.id } });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).send(error);
    }
  },

  updateReview: async (req, res) => {
    try {
      const result = await db.PackReview.update(req.body, { where: { id: req.params.id } });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).send(error);
    }
  },
};
