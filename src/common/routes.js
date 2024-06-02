const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/eligible', controller.getEligibleUnis);
router.get('/programs', controller.getBranchInfos)

module.exports = router;