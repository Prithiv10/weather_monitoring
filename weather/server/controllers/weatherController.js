const db = require('../config/dbConfig');

const getDailyWeatherSummary = (req, res) => {
    const query = `
        SELECT 
            city,
            AVG(temp) AS avg_temp,
            MAX(temp) AS max_temp,
            MIN(temp) AS min_temp,
            (SELECT main FROM weather_data WHERE city = w.city GROUP BY main ORDER BY COUNT(*) DESC LIMIT 1) AS dominant_condition
        FROM weather_data w
        WHERE DATE(dt) = CURDATE()
        GROUP BY city;
    `;
    
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

module.exports = {
    getDailyWeatherSummary
};
