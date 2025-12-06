require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// security 
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/authRoutes'); // <--- 1. Import
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const uploadRoutes = require('./routes/uploadRoutes');


const app = express();

app.use(express.json());
app.use(cors());


//  SECURITY: Set security headers
app.use(helmet({
  crossOriginResourcePolicy: false, // Allows images to load from other domains/localhost
}));


//  SECURITY: Prevent NoSQL injection
app.use(mongoSanitize());

//  SECURITY: Prevent XSS attacks
app.use(xss());

// SECURITY: Rate Limiting (Limit specific IPs to 100 requests per 10 mins)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again after 10 minutes.'
});
// Apply rate limiting to all requests (or you can just apply it to /api/auth)
app.use('/api', limiter);



// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected!'))
  .catch((err) => console.log(' MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes); // <--- 2. Use Routes
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});