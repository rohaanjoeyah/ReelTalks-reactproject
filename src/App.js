// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/styles.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Reviews from './pages/Reviews';
import TopRated from './pages/Toprated';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
