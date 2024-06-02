const pool = require('../../db');
const query = require('./queries');

const getEligibleUnis = async (req, res) => {
    const {dob, location, jeeRank, mark12, mark10} = req.query;
    pool.query(query.getEligibleUnis, [dob, location, jeeRank, mark12, mark10], (err, results) => {
        if(err) throw (err)
        res.json(results.rows);
    });
}

const getBranchInfos = async (req, res) => {
    pool.query(query.getBranchInfos, (err, results) => {
        if(err) throw err;
        res.send(results.rows);
    })
}

module.exports = {
    getEligibleUnis,
    getBranchInfos,
}