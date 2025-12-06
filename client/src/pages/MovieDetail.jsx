// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api"; // Import API helper
import ReviewSection from "../components/ReviewSection"; // ⬅️ Import the new Review Component

const MovieDetail = () => {
  const { id } = useParams(); // Get the MongoDB _id from URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await api.get(`/movies/${id}`); // Fetch from Backend
        setMovie(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError("Movie not found or server error.");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return <div className="error">Movie not found.</div>;

  return (
    <main className="movie-detail">
      <div className="movie-detail-container">
        <div className="movie-poster-container">
          {movie.poster ? (
            <img 
              src={`/images/${movie.poster}`} 
              alt={`${movie.title} Poster`} 
              className="movie-poster"
              onError={(e) => { e.target.src = "/images/default_poster.jpg"; }} 
            />
          ) : (
            <div className="no-poster">No Image Available</div>
          )}
        </div>

        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="movie-rating">⭐ {movie.rating}/10</p>
          <p className="movie-year-genre">{movie.year} • {movie.genre}</p>
          <p className="movie-description">{movie.description}</p>
          
          <p className="movie-cast"><strong>Cast:</strong> {movie.cast || "N/A"}</p>

          {/* Trailer iframe */}
          {movie.trailer && (
            <div className="movie-trailer" style={{ marginTop: "1rem" }}>
              <h3>Trailer</h3>
              <iframe
                width="100%"
                height="400"
                src={movie.trailer}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* 👇 NEW: Integrated Reviews Section 👇 */}
          <ReviewSection movieId={movie._id} />
          
        </div>
      </div>
    </main>
  );
};

export default MovieDetail;