// src/components/moviecard.jsx
import React from 'react';
import { Link } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        {movie.posterSrc ? (
          <img src={movie.posterSrc} alt={movie.title} />
        ) : (
          <div className="no-poster">No Image Available</div>
        )}
        <h3>{movie.title}</h3>
      </Link>
      <p>⭐ {movie.rating}/10</p>

      <button
        className={`btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={() => onToggleFavorite(movie.id)}
      >
        {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
