const express = require('express');
const router = express.Router();
const { addReview, getReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

// Note: We use ":movieId" so we know WHICH movie we are reviewing
router.post('/:movieId', protect, addReview);
router.get('/:movieId', getReviews);

// To delete, we only need the review ID
router.delete('/:id', protect, deleteReview);

module.exports = router;