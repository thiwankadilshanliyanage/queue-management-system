//import pkgs
const router = require('express').Router()
const logoutRouter = require('../controllers/normalUserController')

//logout
router.route('/')
.get(logoutRouter.normalUserLogout)

module.exports = router