const express = require('express');
const db = require('./db');

const User = require('./models/User');
const getWeatherData = require('./utils/weather');
const getCityName = require('./utils/locationCode');
const auth = require('./middleware/auth');
const authRoutes = require('./auth');
const dotenv = require('dotenv');
const {cronJob} = require('./utils/schedular');




dotenv.config();

cronJob();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.post('/users', async (req, res) => {
  const { email, password, lat, lon } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const city = await getCityName(lat, lon);
    const user = new User({ email, password: hashedPassword, location: { lat, lon }, city });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.put('/users/', auth, async (req, res) => {
  const { email, lat, lon } = req.body;
  try {
    console.log(email, lat, lon);
    const city = await getCityName(lat, lon);
    const user = await User.findOneAndUpdate(
      { email },
      { location: { lat, lon }, city },
      { new: true }
    );
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/weather/:email/', auth, async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send();
    }
    const weatherData = await getWeatherData(user.location.lat, user.location.lon);
    res.send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
