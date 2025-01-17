const pool = require('../../db');
const query = require('./queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Defining all the API methods for Student's purpose 

const getStudents = (req, res) => {
    pool.query(query.getStudents, (err, results) => {
        if(err) throw err;
        res.json(results.rows);
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(query.getStudentById, [id], (err, results) => {
        if(err) throw err;
        res.json(results.rows);
    })
}

const checkStudentExist = (req, res) => {
    const {name, phone, email} = req.query;
    pool.query(query.checkStudentExist, [name, phone, email], (err, results) => {
        if(err) throw err;
        if(results.rowCount == 0) res.json({Unique: true});
        else res.json({Unique: false});
    })
}

const addStudent = (req, res) => {
    const {student_username, phone_number, student_mail, student_password} = req.body;
    bcrypt.hash(student_password, 15).then(
        hash => {
            pool.query(query.addStudent, [student_username, phone_number, student_mail, hash], (err, results) => {
                if(err) throw err;
                else {
                    res.json({Success: true});
                }
            })
       }
    )
}

const loginStudent = (req, res) => {
    const {student_username, student_password} = req.body;
    pool.query(query.loginStudent, [student_username], (err, result) => {
        if(err) throw err;
        if (result.rowCount == 0) return res.json({Success: 1, msg: "No such user"});
        else {
            bcrypt.compare(student_password, result.rows[0]['student_password'], (err1, result1)=> {
                if(result1) {
                    const token = jwt.sign(
                        {name: result.rows[0]['student_username'], role: "student"}, // User Info and his Role
                        "desy-secret",                                               // Secret Signing
                        {expiresIn: '1d'}                                            // Validity of Cookie
                    );
                    
                /*
                    path: '/': Makes the cookie available to all routes of the application.
                    domain: 'localhost': Restricts the cookie to the localhost domain. This is useful in development 
                    but should be configured differently in production. 
                */
                    res.cookie('token', token, { path: '/', domain: 'localhost'});
                    return res.json({Success: 2, msg: "Login Succesful"})
                } else {
                    return res.json({Success: 3, msg: "Login Failed"});
                }
            })
        }
    })
}

const logoutStudent = (req, res) => {
    console.log("getting the request!!")
    res.clearCookie('token', { path: '/', domain: 'localhost' });
    return res.json({ Success: 1, msg: "Logout Successful" });
}

const checkStudentNew = (req, res) => {
    res.json("Private route enabled");
}

module.exports = {
    getStudents,
    getStudentById,
    checkStudentExist,
    addStudent,
    loginStudent,
    logoutStudent,
    checkStudentNew
}