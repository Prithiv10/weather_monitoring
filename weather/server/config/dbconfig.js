const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'weather' 
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

module.exports = db;

