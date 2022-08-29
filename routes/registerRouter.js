//import pkgs
const router = require('express').Router()
const userController = require('../controllers/userController')
const { route } = require('./roleRouter')

router.route('/')

.post(userController.registerUser)

module.exports = router