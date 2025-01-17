const { Router } = require('express');
const controller = require('./controller');

const router = Router();

const verifyUser = (req, res, next) => {
    console.log(req.cookies.token);
    next()
}

// Defining all the routes for Student's purpose

router.get('/', controller.getStudents);
router.post('/signup', controller.addStudent);
router.post('/login', controller.loginStudent);
router.post('/logout', controller.logoutStudent);
router.get('/check', controller.checkStudentExist);
router.get('/isnew', verifyUser, controller.checkStudentNew); // Bug 

module.exports = router;