require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./model/Movie');
const User = require('./model/user'); // We need an admin ID
const movies = require('./data/movies'); // The file you just made

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const importData = async () => {
  try {
    // 1. Clear existing movies to avoid duplicates
    await Movie.deleteMany();

    // 2. We need to attach an Admin User to these movies
    // (Since our Schema requires a "user" field)
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
        console.log("❌ Error: No Admin user found! Register one in Postman first.");
        process.exit(1);
    }

    // 3. Add the admin ID to every movie object
    const sampleMovies = movies.map((movie) => {
      return { ...movie, user: adminUser._id };
    });

    // 4. Insert into Database
    await Movie.insertMany(sampleMovies);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();