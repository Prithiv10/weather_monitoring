const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { getDailyWeatherSummary } = require('./controllers/weatherController');
const { fetchAndSaveAllCitiesWeather } = require('./services/weatherService');

const app = express();
app.use(cors());


app.get('/api/weather-summary', getDailyWeatherSummary);

setInterval(fetchAndSaveAllCitiesWeather, 5 * 60 * 1000);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
