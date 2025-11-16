// src/pages/MovieDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moviesData from "../data/movies.json";

const MovieDetail = () => {
  const { id } = useParams(); // get movie id from URL
  const [movie, setMovie] = useState(null);
  const [posterSrc, setPosterSrc] = useState(null);

  useEffect(() => {
    // find movie by id from JSON
    const selectedMovie = moviesData.find((m) => m.id === parseInt(id));
    setMovie(selectedMovie);

    if (selectedMovie) {
      // dynamically require poster image
      try {
        const poster = require(`../assets/images/${selectedMovie.poster}`);
        setPosterSrc(poster);
      } catch (err) {
        console.error("Poster not found:", err);
        setPosterSrc(null);
      }
    }
  }, [id]);

  if (!movie) {
    return (
      <main className="movie-detail">
        <p>Loading movie details...</p>
      </main>
    );
  }

  // Safely handle cast: array, string, or missing
  const renderCast = () => {
    if (!movie.cast) return "N/A";
    if (Array.isArray(movie.cast)) return movie.cast.join(", ");
    return movie.cast; // assume string
  };

  return (
    <main className="movie-detail">
  <div className="movie-detail-container">
    <div className="movie-poster-container">
      {posterSrc ? (
        <img src={posterSrc} alt={`${movie.title} Poster`} className="movie-poster" />
      ) : (
        <div className="no-poster">No Image Available</div>
      )}
    </div>

    <div className="movie-info">
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-rating">⭐ {movie.rating}/10</p>
      <p className="movie-year-genre">{movie.year} • {movie.genre}</p>
      <p className="movie-description">{movie.description}</p>
      <p className="movie-cast"><strong>Cast:</strong> {renderCast()}</p>

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
    </div>
  </div>
</main>

  );
};

export default MovieDetail;
