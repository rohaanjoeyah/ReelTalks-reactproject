import axios from 'axios';

// 🌍 CONFIGURATION
// If the app is running on Vercel (Production), use the Railway URL.
// If running on your computer (Development), use localhost.

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://reeltalks-reactproject-production.up.railway.app/api'  // ☁️ LIVE
  : 'http://localhost:5000/api';                                   // 💻 LOCAL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Interceptor: Automatically add Token to requests
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;