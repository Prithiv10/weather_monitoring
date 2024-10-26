import React, { useState, useEffect } from 'react';
import axios from 'axios';


const WeatherDisplay = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [unit, setUnit] = useState("C"); 
    const [threshold, setThreshold] = useState(35); 
    const [consecutiveBreaches, setConsecutiveBreaches] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:8081/api/weather-summary');
                setWeatherData(result.data);
            } catch (error) {
                console.error("Error fetching weather summary:", error);
            }
        };
        fetchData();
    }, []);

    const convertTemperature = (kelvin) => {
        if (unit === "C") return (kelvin - 273.15).toFixed(2); 
        if (unit === "F") return ((kelvin - 273.15) * 9/5 + 32).toFixed(2); 
        return kelvin.toFixed(2);
    };

    const checkThreshold = (data) => {
        const updatedBreaches = { ...consecutiveBreaches };
        
        data.forEach(cityData => {
            const avgTemp = parseFloat(convertTemperature(cityData.avg_temp));
            const city = cityData.city;

            if (avgTemp > threshold) {
                updatedBreaches[city] = (updatedBreaches[city] || 0) + 1;
                if (updatedBreaches[city] >= 2) {
                    console.warn(`ALERT: ${city} has exceeded the temperature threshold of ${threshold}°${unit} for two consecutive updates!`);
                }
            } else {
                updatedBreaches[city] = 0;
            }
        });
        
        setConsecutiveBreaches(updatedBreaches);
    };


    return (
        <div className="weather-container">
            <h1> Real-Time Weather Monitoring</h1>
            <div className="unit-toggle">
                <label>Temperature Unit:</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="C">Celsius °C</option>
                    <option value="F">Fahrenheit °F</option>
                </select>
            </div>
            <div className="threshold-setting">
                <label>Alert Threshold (°{unit}):</label>
                <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                />
            </div>
            <ul className="weather-list">
                {weatherData.map(data => (
                    <li key={data.city} className="weather-box">
                        <div className="city-name">{data.city}</div>
                        <div className="temp">Avg Temp: {convertTemperature(data.avg_temp)}°{unit}</div>
                        <div className="temp">Max Temp: {convertTemperature(data.max_temp)}°{unit}</div>
                        <div className="temp">Min Temp: {convertTemperature(data.min_temp)}°{unit}</div>
                        <div className="temp">Dominant Condition: {data.dominant_condition}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WeatherDisplay;
