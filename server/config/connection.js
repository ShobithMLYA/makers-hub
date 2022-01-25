const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'events_platform'
});

con.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = con;