const axios = require('axios');
const db = require('../config/dbConfig');
require('dotenv').config();

const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
const apiKey = '26a7b9e18154b58104d936975afc6fba';

const fetchWeatherData = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        const weather = response.data;
        return {
            city: city,
            main: weather.weather[0].main,
            temp: weather.main.temp,
            feels_like: weather.main.feels_like,
            dt: weather.dt
        };
    } catch (error) {
        console.error(`Error fetching weather data for ${city}:`, error);
    }
};

const saveWeatherData = (weather) => {
    const query = `INSERT INTO weather_data (city, main, temp, feels_like, dt) VALUES (?, ?, ?, ?, FROM_UNIXTIME(?))`;
    db.execute(query, [weather.city, weather.main, weather.temp, weather.feels_like, weather.dt], (err, results) => {
        if (err) throw err;
        console.log('Weather data saved for:', weather.city);
    });
};

const fetchAndSaveAllCitiesWeather = async () => {
    for (const city of cities) {
        const data = await fetchWeatherData(city);
        if (data) saveWeatherData(data);
    }
};

module.exports = {
    fetchAndSaveAllCitiesWeather
};
