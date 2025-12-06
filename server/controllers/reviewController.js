const Review = require('../model/Review');
const Movie = require('../model/Movie');

// @desc    Add a review to a movie
// @route   POST /api/reviews/:movieId
// @access  Private (Logged in users only)
exports.addReview = async (req, res) => {
  const { text, rating } = req.body;
  const movieId = req.params.movieId;

  try {
    // 1. Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // 2. Check if user already reviewed this movie
    const alreadyReviewed = await Review.findOne({
      movie: movieId,
      user: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this movie' });
    }

    // 3. Create Review
    const review = await Review.create({
      text,
      rating,
      movie: movieId,
      user: req.user._id // Get ID from the logged-in user token
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews for a specific movie
// @route   GET /api/reviews/:movieId
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name') // Replace user ID with user's Name
      .sort({ createdAt: -1 }); // Newest first

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Owner only)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // 🔒 OWNERSHIP CHECK: Is the logged-in user the owner?
    // We convert IDs to strings to compare them safely
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};