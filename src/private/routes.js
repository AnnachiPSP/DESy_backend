const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/isnew', controller.checkStudentNew);
router.get('/verifyUser', controller.verifyUser);
router.get('/getInstitutes', controller.eligibleInstitutes);
router.post('/applicationGenerate', controller.applicationGenerate);

// Testing phase
router.post('/student_apply/:userName', controller.applicationSubmit);

module.exports = router;