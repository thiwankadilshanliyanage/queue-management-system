//import pkgs
const router =require('express').Router()
const userController = require('../controllers/userController')

//get login page and authorization
router.route('/')
.get((req,res)=>{
    res.json({success:"Now you are in Login Page",status:200})
})
.post(userController.UserLogin)

module.exports = router