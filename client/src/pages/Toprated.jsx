// src/pages/TopRated.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api"; // ⬅️ Import API
import { Link } from "react-router-dom"; // Import Link for navigation

const TopRated = () => {
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        // Fetch all movies from MongoDB
        const { data } = await api.get('/movies');
        
        // Sort by rating (High -> Low) and take the top 3
        const sortedMovies = data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
          
        setTopMovies(sortedMovies);
        setLoading(false);
      } catch (err) {
        console.error("Error loading top movies:", err);
        setError("Failed to load top rated movies.");
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  if (loading) return <div className="loading">Loading top movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="top-rated-page">
      <h2>Top Rated Movies</h2>
      <div className="top-rated-list">
        {topMovies.map((movie, index) => {
          return (
            <article key={movie._id} className="top-rated-card">
              <span className="rank">#{index + 1}</span>
              
              <Link to={`/movies/${movie._id}`}>
                {movie.poster ? (
                  <img 
                    src={`/images/${movie.poster}`} 
                    alt={`${movie.title} Poster`} 
                    onError={(e) => { e.target.src = "/images/default_poster.jpg"; }}
                  />
                ) : (
                  <div className="no-poster">No Image Available</div>
                )}
              </Link>

              <div className="movie-info">
                <Link to={`/movies/${movie._id}`}>
                  <h3>{movie.title}</h3>
                </Link>
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