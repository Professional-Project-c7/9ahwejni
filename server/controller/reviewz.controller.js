const db = require('../Database/index');

const createReviewz = async (req, res) => {
  try {
    const { stars, comment, reviewerId, revieweeId } = req.body;
    const reviewz = await db.Reviewz.create({ stars, comment, reviewerId, revieweeId });
    res.status(201).json(reviewz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewzByReviewee = async (req, res) => {
  try {
    const { revieweeId } = req.params;
    const reviewz = await db.Reviewz.findAll({
      where: { revieweeId },
      include: [
        {
          model: db.User,
          as: 'Reviewer',
          attributes: ['firstName', 'lastName', 'imageUrl']
        }
      ]
    });
    res.status(200).json(reviewz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviewzByReviewer = async (req, res) => {
  try {
    const { reviewerId } = req.params;
    const reviewz = await db.Reviewz.findAll({
      where: { reviewerId },
      include: [
        {
          model: db.User,
          as: 'Reviewee',
          attributes: ['firstName', 'lastName', 'imageUrl']
        }
      ]
    });
    res.status(200).json(reviewz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createReviewz,
  getReviewzByReviewee,
  getReviewzByReviewer,
};