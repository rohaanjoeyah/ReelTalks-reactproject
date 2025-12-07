const jwt = require('jsonwebtoken');
const User = require('../model/user');

// 🛡️ 1. Protect Route: User must be logged in
const protect = async (req, res, next) => {
  let token;

  // Check if header has "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token ID (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next step
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 👑 2. Admin Check: User must be an Admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
