const pool = require('../../db');
const jwt = require('jsonwebtoken');
const query = require('./queries');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const foldername = req.params.folderName;

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
const verifyStudent = (req, callback) => {
    const token = req.cookies.token;
    if (!token) return callback(null);

    jwt.verify(token, "desy-secret", (err, decoded) => {
        if (err) throw err;

        if (decoded.role === "student") {
            callback(decoded.name);
        } else {
            callback(null);
        }
    });
};

const checkStudentNew = (req, res) => {
    verifyStudent(req, (student) => {
        if (student) {
            pool.query(query.checkIsNew, [student], (err, results) => {
                if(err) throw err;
                else return res.json({Success: 1, isNew: results.rows[0]['is_new']});
            })
        } else {
            return res.json({ Success: 2 });
        }
    });
};

const applicationVerify = async (req, res) => {
    const form = upload.fields([
        { name: 'adhaarCopy', maxCount: 1 },
        { name: 'jeeCopy', maxCount: 1 },
        { name: 'mark12Copy', maxCount: 1 },
        { name: 'mark10Copy', maxCount: 1 }
    ]);

    form(req, res, async (err) => {
        if (err) {
            console.error('Error uploading files:', err);
            return res.json({ Success: 0, error: 'Error uploading files' });
        }

        const formData = req.body;

        // Access file data from req.files
        const adhaarCopy = req.files['adhaarCopy'] ? req.files['adhaarCopy'][0] : null;
        const jeeCopy = req.files['jeeCopy'] ? req.files['jeeCopy'][0] : null;
        const mark12Copy = req.files['mark12Copy'] ? req.files['mark12Copy'][0] : null;
        const mark10Copy = req.files['mark10Copy'] ? req.files['mark10Copy'][0] : null;
        

        res.json({ Success: 1, message: 'Uploaded Locally' });
    });
}

module.exports = {
    checkStudentNew,
    applicationVerify
};
