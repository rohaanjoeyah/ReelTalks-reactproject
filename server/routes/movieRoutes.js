const express = require('express');
const router = express.Router();
const {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie, // Ensure this matches the export name exactly
} = require('../controllers/movieController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public: Anyone can see movies
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Protected: Only Admin can add, delete, or update
router.post('/', protect, admin, createMovie);
router.delete('/:id', protect, admin, deleteMovie);
router.put('/:id', protect, admin, updateMovie);

module.exports = router;