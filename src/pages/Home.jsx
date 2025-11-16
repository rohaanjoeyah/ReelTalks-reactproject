// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import moviesData from "../data/movies.json";
import { Link } from "react-router-dom";
import AIChat from "../components/AIChat";

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);

  useEffect(() => {
    const fetchTMDBMovies = async () => {
      try {
        const apiKey = process.env.REACT_APP_TMDB_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
        );
        const data = await response.json();

        if (data && data.results) {
          // Map TMDB data to your local format
          const tmdbMovies = data.results.slice(0, 6).map((movie) => ({
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
            genre: "N/A", // TMDB genre requires another endpoint
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }));
          setFeaturedMovies(tmdbMovies);
        } else {
          setFeaturedMovies(moviesData.slice(0, 3)); // fallback
        }
      } catch (err) {
        console.error("TMDB fetch failed:", err);
        setFeaturedMovies(moviesData.slice(0, 3)); // fallback
      }
    };

    fetchTMDBMovies();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to ReelTalks</h2>
        <p>Your go-to place for honest movie reviews.</p>
      </section>

      {/* Featured Movies Section */}
      <section className="featured">
        <h2>Featured Movies</h2>
        <div className="movie-grid">
          {featuredMovies.map((movie) => (
            <article key={movie.id} className="movie-card">
              <Link to={`/movies/${movie.id}`}>
                {movie.poster ? (
                  <img src={movie.poster} alt={`${movie.title} Poster`} />
                ) : (
                  <div className="no-poster">No Image Available</div>
                )}
                <h3>{movie.title}</h3>
              </Link>
              <p>⭐ {movie.rating}/10</p>
            </article>
          ))}
        </div>
          </section>
          <AIChat />
      </div>
      
  );
};

export default Home;
