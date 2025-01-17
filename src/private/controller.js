const pool = require('../../db');
const jwt = require('jsonwebtoken');
const query = require('./queries');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const foldername = req.params.userName;

        // For now destination is in the root folder '/src'
        const destination = path.join(__dirname, foldername);

        // Check if the directory exists, create it if not
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }

        callback(null, destination);
    },
    filename:function(req, file, callback){
        const extension = file.originalname.split(".").pop();
        callback(null, `${file.fieldname}.${extension}`);
    }
});

const upload = multer({ storage: storage });

// Verifying the protected routes
const verifyStudent = async (req) => {
    return new Promise((resolve, reject) => {
        const token = req.cookies.token;

        if (!token) {
            resolve(null);
            return;
        }

        jwt.verify(token, "desy-secret", (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            if (decoded.role === "student") {
                resolve(decoded.name);
            } else {
                resolve(null);
            }
        });
    });
};


const verifyUser = async (req, res) => {
    try {
        const student = await verifyStudent(req);

        if (student) {
            res.json({ Success: 1, user: student });
        } else {
            res.json({ Success: 2 });
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        res.json({ Success: 0, error: 'Error verifying user' });
    }
};


const checkStudentNew = async (req, res) => {
    try {
        const student = await verifyStudent(req);

        if (student) {
            pool.query(query.checkIsNew, [student], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.json({ Success: 0, error: 'Database error' });
                } else {
                    return res.json({ Success: 1, isNew: results.rows[0]['is_new'], user: student });
                }
            });
        } else {
            return res.json({ Success: 2 });
        }
    } catch (error) {
        console.error('Error verifying student:', error);
        res.json({ Success: 0, error: 'Error verifying student' });
    }
};


const applicationSubmit = async (req, res) => {
    const form = upload.fields([
        { name: 'aadharCopy', maxCount: 1 },
        { name: 'jeeCopy', maxCount: 1 },
        { name: 'mark12Copy', maxCount: 1 },
        { name: 'mark10Copy', maxCount: 1 }
    ]);

    form(req, res, async (err) => {
        if (err) {
            console.error('Error uploading files:', err);
            return res.json({ Success: 0, message: 'Error uploading files' });
        }

        const formData = req.body;

        // Access file data from req.files
        const aadharCopy = req.files['aadharCopy'] ? req.files['aadharCopy'][0] : null;
        const jeeCopy = req.files['jeeCopy'] ? req.files['jeeCopy'][0] : null;
        const mark12Copy = req.files['mark12Copy'] ? req.files['mark12Copy'][0] : null;
        const mark10Copy = req.files['mark10Copy'] ? req.files['mark10Copy'][0] : null;

        pool.query(query.updateStudentApplication, [formData.fullname, formData.dob, formData.gender, formData.location, formData.aadharNo, aadharCopy.path, formData.jeeRank, jeeCopy.path, formData.mark10, mark10Copy.path, formData.mark12, mark12Copy.path, req.params.userName], (error, results) => {
            if (error) {
                console.log('Error: '+ error);
            } else {
                res.json({Success: 1, message: 'Submitted Successfully!'});
            }
        })
    });
};

const eligibleInstitutes = async (req, res) => {

    try{
        const student = await verifyStudent(req);

        if(student){
            pool.query(query.eligibleInstitutes, [student], (err, result) => {
                if(err) throw err;
        
                if(result.rowCount>0) {
                    res.json({Success: 1, name: student, data: result.rows});
                }
                else res.json({Success: 2});
            });
        } else {
            res.json({Success: 0})
        }
    } catch(err) {
        console.log(err);
    }
    
}

const applicationGenerate = async (req, res) => {

    try{
        const student = await verifyStudent(req);
        const {institute_id, branch} = req.body;

        if(student) {
            console.log(student, institute_id, branch);
            pool.query(query.applicationGenerate, [student, institute_id, branch], (error, result) => {
                res.json(result.rows);
            })
        }

    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkStudentNew,
    applicationSubmit,
    verifyUser,
    eligibleInstitutes,
    applicationGenerate
};
