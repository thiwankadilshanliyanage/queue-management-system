const router = require('express').Router()
const issueTypesController =require('../controllers/normalUserController')
const issue = require('../controllers/issueController')
const middleware = require('../middleware/queueNum')
router.route('/')

.get(issueTypesController.normalUsersHomePage)


router.route('/createIssue')
.post(middleware.queueNum,issue.addIssue)

module.exports = router