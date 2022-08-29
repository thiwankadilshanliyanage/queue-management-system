//import pkgs
const router = require('express').Router()
const logoutRouter = require('../controllers/logoutControler')

//logout
router.route('/')
.get(logoutRouter.logout)

module.exports = router