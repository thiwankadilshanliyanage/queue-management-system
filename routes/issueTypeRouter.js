const router = require('express').Router()
const issueTypesController =require('../controllers/normalUserController')

router.route('/')

.get(issueTypesController.normalUsersHomePage)

module.exports = router