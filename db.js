const Pool = require('pg').Pool; 

// Database Initialization

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "learning",
    password: "surya123",
    port: 4000
});

module.exports = pool;