const router = require('express').Router()
const roleController = require('../controllers/roleController')

router.route('/')
.get(roleController.getAllRoles)

module.exports = router