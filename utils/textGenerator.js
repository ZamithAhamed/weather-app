const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');


dotenv.config();

const generateWeatherText = async (weatherData) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);
    const d = new Date();
  const prompt = `
  <b>Current weather in Kandy </b> | Jul 13 2024 00:18:02 GMT+0530 <br><br>
<b>Weather : </b> Broken clouds<br>
<b>Temperature : </b> 301.14 K (28.99°C)<br>
<b>Feels like : </b> 306.35 K (33.20°C)<br>
<b>Min temperature : </b> 301.14 K<br>
<b>Max temperature : </b> 301.14 K<br>
<b>Pressure : </b> 1009 hPa<br>
<b>Humidity : </b> 87% <br>
<b>Visibility : </b> 10.0 km <br>
<b>Wind : </b> 5.82 m/s from 241° (West-Southwest) <br>
<b>Gusts : </b> 9.07 m/s <br>
<b>Cloudiness : </b> 82% <br>
<b>Sunrise : </b> 05:31 AM (local time) <br>
<b>Sunset : </b> 06:37 PM (local time) 
<br><br>
Colombo currently experiences broken clouds, with a temperature around 28.99°C. Humidity is relatively high at 87%, and the wind is blowing from the west-southwest at a speed of 5.82 m/s.

Generate a detailed weather report based on the following data make sure you strickly follow the above structure and use date time as ${d} : ${JSON.stringify(weatherData)}`;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error(error);
    return 'Unable to generate weather report text';
  }
};

module.exports = generateWeatherText;
