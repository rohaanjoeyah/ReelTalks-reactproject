// src/pages/TopRated.jsx
import React, { useEffect, useState } from "react";
import moviesData from "../data/movies.json";

const TopRated = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    // Sort movies by rating descending and take top 3
    const top3 = [...moviesData]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    setTopMovies(top3);
  }, []);

  const loadPoster = (posterFile) => {
    try {
      return require(`../assets/images/${posterFile}`);
    } catch (err) {
      console.error("Poster not found:", posterFile);
      return null;
    }
  };

  return (
    <main className="top-rated-page">
      <h2>Top Rated Movies</h2>
      <div className="top-rated-list">
        {topMovies.map((movie, index) => {
          const posterSrc = loadPoster(movie.poster);
          return (
            <article key={movie.id} className="top-rated-card">
              <span className="rank">#{index + 1}</span>
              {posterSrc ? (
                <img src={posterSrc} alt={`${movie.title} Poster`} />
              ) : (
                <div className="no-poster">No Image Available</div>
              )}
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>⭐ {movie.rating}/10</p>
                <p>{movie.year} • {movie.genre}</p>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
};

export default TopRated;
