const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
    const { email, password, lat, lon } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send('Email and password are required');
      }
  
      const hashedPassword = await bcrypt.hash(password, 8);
      const city = lat && lon ? await getCityName(lat, lon) : null;
      const user = new User({ email, password: hashedPassword, location: { lat, lon }, city });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error.message || 'Failed to register user');
    }
  });
  
  // Login User
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.send({ token });
    } catch (error) {
      res.status(400).send(error.message || 'Failed to login');
    }
  });
  

module.exports = router;
