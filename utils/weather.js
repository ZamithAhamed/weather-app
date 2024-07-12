const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getWeatherData = async (lat, lon) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHERMAP_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getWeatherData;
