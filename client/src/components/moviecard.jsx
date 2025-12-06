// src/components/moviecard.jsx
import React from 'react';
import { Link } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-card">
      {/* 🔗 Link now uses the MongoDB _id */}
      <Link to={`/movies/${movie._id}`}>
        
        {/* 🖼️ Image now points to the public/images folder */}
        {movie.poster ? (
          <img 
            src={`/images/${movie.poster}`} 
            alt={movie.title} 
            onError={(e) => { e.target.src = "/images/default_poster.jpg"; }} // Optional fallback
          />
        ) : (
          <div className="no-poster">No Image Available</div>
        )}
        
        <h3>{movie.title}</h3>
      </Link>
      
      <p>⭐ {movie.rating}/10</p>

      <button
        className={`btn favorite-btn ${isFavorite ? 'favorited' : ''}`}
        // 🔄 Use _id for favorites logic too
        onClick={() => onToggleFavorite(movie._id)}
      >
        {isFavorite ? '★ Remove from Favorites' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;