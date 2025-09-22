const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admi', 
    database: 'odontology_api',
    port: 3300, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;