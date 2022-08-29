const db = require('../models')
const  { sequelize, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emailValidator = require('email-validator')
require('dotenv').config();

//main models
const Counter = db.counters
const Issue_type = db.issue_types
const Issue = db.issues
const Notification = db.notifications
const Role = db.roles
const User = db.users

//cookie life time
const maxAge = 3 * 24 * 60 * 60

//register new user
const registerUser = async (req,res)=>{
    const {name,contact,email,password,confirmPassword,role_id} = req.body

    //email validate
    if(!emailValidator.validate(email))
    return res.status(400).send({message:'email is not validate'})

    //validate contact
    const validateContact = /^0[0-9]{9}?$/


    //all data is available
    if(!name || !contact || !email || !password || !confirmPassword || !role_id)
    return res.status(400).json({message:'All informaion are required'})
}
