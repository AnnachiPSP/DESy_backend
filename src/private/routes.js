const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/isnew', controller.checkStudentNew);

// Testing phase
router.post('/student_apply/:folderName', controller.applicationVerify);

module.exports = router;