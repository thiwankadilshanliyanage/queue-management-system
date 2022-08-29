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
    if(!validateContact.test(contact))
    return res.status(400).send({message: 'Contact is not valied'})

    //password validate with confirm password
    if(password !== confirmPassword)
    return res.status(400).send({message:'password is not match'})


    //all data is available
    if(!name || !contact || !email || !password || !confirmPassword || !role_id)
    return res.status(400).json({message:'All informaion are required'})

    //checking same user
    const duplicate = await User.findAll({
        where:{
            email:email
        }
    })
    if(duplicate.length>0)
    return res.send({message:'User already registered'});
    else{
        try {
            //encrypt the password
            const hashedPwd = await bcrypt.hash(password,10)

            //add new user to db
            const newUser = await User.create({
                name : name,
                contact:contact,
                email: email,
                password:hashedPwd,
                role_id:role_id
            },{fields:['name','contact','email','password','role_id']})
            return res.status(200).json({'message': 'Register Successful'})
        } catch (error) {
            return res.status(500).send({ message : error.message })
        }
    }
}

module.exports = {
    registerUser
}
