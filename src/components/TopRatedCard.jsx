// src/components/TopRatedCard.jsx
import React from 'react';

const TopRatedCard = ({ movie }) => {
  return (
    <article className="top-rated-card">
      <span className="rank">#{movie.rank}</span>
      <img src={movie.poster} alt={`${movie.title} Poster`} />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.rating}/10</p>
        <p>{movie.year} • {movie.genre}</p>
      </div>
    </article>
  );
};

export default TopRatedCard;
