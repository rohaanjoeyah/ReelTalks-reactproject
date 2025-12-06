const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  poster: { type: String, required: true }, // URL or filename
  description: { type: String, required: true },
  trailer: { type: String }, // Optional URL
  cast: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, // To know which Admin added it
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Movie', movieSchema);