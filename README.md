HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# ReelTalks-reactproject
project
# ReelTalks - Movie Review Platform

ReelTalks is a dynamic movie review web application built in **React.js**. It allows users to explore movies, view details, watch trailers, add favorites, submit reviews, and interact with an AI chat assistant. The project demonstrates React fundamentals, state management, API integration, Firebase forms, Local Storage usage, and clean code practices.

---

## Table of Contents
- [Features](#features)
- [Demo](#demo)
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
- Fully responsive layout with **Tailwind CSS** styling.

---

## Demo

Add your live demo link here if hosted (e.g., Netlify, Vercel, GitHub Pages).

---

## Tech Stack

- React.js  
- Tailwind CSS / CSS Modules  
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

2. Install dependencies:

npm install

3. Add .env in the root with API keys

REACT_APP_TMDB_KEY=your_tmdb_api_key
REACT_APP_OPENAI_KEY=your_openai_api_key


4. Start Development Server

 npm start


 Folder Strucrure
 /src
  /assets
    /images       # Movie posters
    /css          # Stylesheets
  /components     # Reusable React components
  /data           # Local JSON data (movies, reviews)
  /pages          # Page components (Home, Movies, MovieDetail, Reviews)
  /services       # API and Firebase helpers


