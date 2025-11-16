// src/pages/Movies.jsx
import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/moviecard';
import moviesData from '../data/movies.json';
import { getFavorites, saveFavorites } from "../services/localstorage";

const Movies = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState("all");   // ⭐ NEW STATE
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load posters
  const loadPoster = (posterFile) => {
    try {
      return require(`../assets/images/${posterFile}`);
    } catch (err) {
      console.error("Poster not found:", posterFile);
      return null;
    }
  };

  useEffect(() => {
    const moviesWithImages = moviesData.map(movie => ({
      ...movie,
      posterSrc: loadPoster(movie.poster)
    }));
    setMovies(moviesWithImages);
  }, []);

  useEffect(() => {
    const persisted = getFavorites();
    setFavorites(persisted);
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const handleToggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  // ⭐ FILTER + SEARCH TOGETHER
  const filteredMovies = useMemo(() => {
    let list = [...movies];

    // 1️⃣ APPLY FAVORITES FILTER
    if (filter === "favorites") {
      list = list.filter((m) => favorites.includes(m.id));
    }

    // 2️⃣ APPLY SEARCH
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        (m.genre || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [movies, query, filter, favorites]);

  return (
    <div className="movies-page">
      <main>
        <div className="movies-header">
          <h2>All Movies</h2>

          <div className="movies-controls">
            
            {/* 🔍 SEARCH INPUT */}
            <input
              type="search"
              className="search-input"
              placeholder="Search by title or genre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search movies"
            />

            {/* DROPDOWN for filtering */}
            <select
              className="filter-dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Movies</option>
              <option value="favorites">Favorites </option>
            </select>
          </div>
        </div>

        <div className="movie-grid">
          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <p className="no-results">No movies found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Movies;
