//import pkgs
const db = require('../models')
const { sequelize, Sequelize } = require('../models')

//main model
const User = db.users

//logout
const logout = async (req,res) =>{
    req.email = null
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({message:'Logout Successfull'})
}

module.exports={
    logout
}
