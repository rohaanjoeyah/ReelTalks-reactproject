const Movie = require('../model/Movie');
const User = require('../model/user'); // Required if we need user info

// @desc    Get all movies
// @route   GET /api/movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a movie
// @route   POST /api/movies
// @access  Private/Admin
exports.createMovie = async (req, res) => {
  const { title, rating, year, genre, poster, description, trailer, cast } = req.body;

  try {
    const movie = new Movie({
      title,
      rating,
      year,
      genre,
      poster,
      description,
      trailer,
      cast,
      user: req.user._id, // From the authMiddleware
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a movie
// @route   DELETE /api/movies/:id
// @access  Private/Admin
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      await movie.deleteOne();
      res.json({ message: 'Movie removed' });
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a movie
// @route   PUT /api/movies/:id
// @access  Private/Admin
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      movie.title = req.body.title || movie.title;
      movie.year = req.body.year || movie.year;
      movie.genre = req.body.genre || movie.genre;
      movie.rating = req.body.rating || movie.rating;
      movie.description = req.body.description || movie.description;
      movie.cast = req.body.cast || movie.cast;
      // If a new image is uploaded, use it. Otherwise keep old one.
      movie.poster = req.body.poster || movie.poster;

      const updatedMovie = await movie.save();
      res.json(updatedMovie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};