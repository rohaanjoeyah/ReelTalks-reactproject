HEAD

# ReelTalks - Movie Review Platform

ReelTalks is a dynamic movie review web application built in **React.js**. It allows users to explore movies, view details, watch trailers, add favorites, submit reviews, and interact with an AI chat assistant. The project demonstrates React fundamentals, state management, API integration, Firebase forms, Local Storage usage, and clean code practices.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [APIs Used](#apis-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Contributors](#contributors)

---

## Features

- Browse movies dynamically from **local JSON** data.  
- **Movie details page** with cast, rating, genre, and description.  
- **Watch trailers** via embedded YouTube videos.  
- **Add to Favorites** stored in Local Storage.  
- **Submit Reviews** stored in Firebase Firestore.  
- **Search and filter** movies by title, genre, and favorites.  
- **AI Chat Assistant** to ask movie-related questions.  

---

---

## Tech Stack

- React.js  
- CSS 
- Firebase Firestore  
- Local Storage  
- TMDB API (for dynamic trending movies)  
- YouTube (for embedded trailers)  
- OpenAI API (AI chat assistant)

---

## APIs Used

1. **TMDB API**  
   - Endpoint: `https://api.themoviedb.org/3/trending/movie/week`  
   - Used to fetch trending movies for the homepage.  

2. **YouTube Embed URLs**  
   - Used to display trailers on movie detail pages.  

3. **Firebase Firestore**  
   - Stores user-submitted reviews.  

4. **OpenAI API**  
   - Provides AI chat responses in the "Ask AI" section.

---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/rohaanjoeyah/ReelTalks-reactproject.git
cd ReelTalks-reactproject
```
2. Install dependencies:

```bash
npm install
```

4. Add .env in the root with API keys
```
REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_OPENAI_KEY=your_openai_api_key
```

4. Start Development Server
```
 npm start
```

 Folder Strucrure
 /src
  /assets
    /images       # Movie posters
    /css          # Stylesheets
  /components     # Reusable React components
  /data           # Local JSON data (movies, reviews)
  /pages          # Page components (Home, Movies, MovieDetail, Reviews)
  /services       # API and Firebase helpers


