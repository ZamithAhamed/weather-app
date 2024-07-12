const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { lat: Number, lon: Number },
  city: { type: String },
  weatherData: {
    type: Map,
    of: String,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
