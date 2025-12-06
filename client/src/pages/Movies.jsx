import React, { useState, useEffect, useMemo } from 'react';
import MovieCard from '../components/moviecard';
import api from '../services/api'; // ⬅️ Use our API helper
import { getFavorites, saveFavorites } from "../services/localstorage";

const Movies = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState("all");
  const [movies, setMovies] = useState([]); // Default empty array
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  // 1️⃣ FETCH MOVIES FROM API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await api.get('/movies'); // calls http://localhost:5000/api/movies
        setMovies(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Load favorites from local storage
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

  // Filter Logic
  const filteredMovies = useMemo(() => {
    let list = [...movies];

    if (filter === "favorites") {
      list = list.filter((m) => favorites.includes(m._id)); // Note: MongoDB uses _id, not id
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((m) =>
        m.title.toLowerCase().includes(q) ||
        (m.genre || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [movies, query, filter, favorites]);

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movies-page">
      <main>
        <div className="movies-header">
          <h2>All Movies</h2>
          <div className="movies-controls">
            <input
              type="search"
              className="search-input"
              placeholder="Search by title or genre..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="filter-dropdown"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Movies</option>
              <option value="favorites">Favorites</option>
            </select>
          </div>
        </div>

        <div className="movie-grid">
          {filteredMovies.length ? (
            filteredMovies.map((movie) => (
              <MovieCard
                key={movie._id} // MongoDB uses _id
                movie={movie}
                isFavorite={favorites.includes(movie._id)}
                onToggleFavorite={() => handleToggleFavorite(movie._id)}
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