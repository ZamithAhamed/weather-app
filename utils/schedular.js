const cron = require('node-cron');
const User = require('../models/User');
const getWeatherData = require('./weather');
const sendEmail = require('./email');
const generateWeatherText = require('./textGenerator');

async function cronJob() {
  cron.schedule('0 */3 * * *', async () => {
    const users = await User.find({});
    users.forEach(async (user) => {
      const weatherData = await getWeatherData(user.location.lat, user.location.lon);
      const weatherText = await generateWeatherText(weatherData);
      sendEmail(user.email, 'Weather Report', weatherText);
      console.log(`Weather Report sent`);
    });
  });
}

exports.cronJob = cronJob;