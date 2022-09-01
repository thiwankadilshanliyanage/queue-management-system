//imports
const router = require('express').Router()
const logoutRouter = require('../controllers/counterUserController')

//logout
router.route('/')
.get(logoutRouter.counterUserLogout)

module.exports = router