const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getCityName = async (lat, lon) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse`, {
      params: {
        lat: `${lat}`,
        lon: `${lon}`,
        appid: process.env.OPENWEATHERMAP_API_KEY,
      },
    });
    const city = response.data[0].name;
    return city ? city : 'Unknown';
  } catch (error) {
    console.error(error);
    return 'Unknown';
  }
};

module.exports = getCityName;
