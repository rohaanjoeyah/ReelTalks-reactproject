require('dotenv').config();
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('../routes/movieRoutes');

// Mock Authentication Middleware
jest.mock('../middleware/authMiddleware', () => ({
  protect: (req, res, next) => {

    req.user = { _id: '507f1f77bcf86cd799439011', role: 'admin' };
    next();
  },
  admin: (req, res, next) => next(),
}));

const app = express();
app.use(express.json());
app.use('/api/movies', movieRoutes);

// Database Connection
beforeAll(async () => {
  const url = process.env.MONGO_URI; 
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/movies', () => {
  it('should create a new movie', async () => {
    const newMovie = {
      title: "Test Unit Movie",
      rating: 9,
      year: 2024,
      genre: "Testing",
      poster: "test.jpg",
      description: "Test description",
      cast: "Test Actor"
    };

    const res = await request(app)
      .post('/api/movies')
      .send(newMovie);

    // If this fails again, the console log below will tell us exactly WHY
    if (res.statusCode !== 201) {
        console.log("❌ Server Error Message:", res.body);
    }

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe("Test Unit Movie");
  });
});