const pool = require('../../db');
const query = require('./queries');

const getApplications = (req, res) => {
    pool.query(query.getApplications, (err, result) => {
        if(err) throw err;
        res.json(result.rows);
    })
}

module.exports = {
    getApplications,
}