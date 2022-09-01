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
    const {name,contact,email,password,confirmPassword,role_id} = req.body //postman fields

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
            },{fields:['name','contact','email','password','role_id']})// db fields
            return res.status(200).json({'message': 'Register Successful'})
        } catch (error) {
            return res.status(500).send({ message : error.message })
        }
    }
}

//login user
const UserLogin = async (req,res) =>{
    const {email, password} = req.body
    const role = 1

    //email validate
    if(!emailValidator.validate(email))
    return res.status(400).send({message:'email is not validate'})
    
    //email & password required
    if(!email || !password)
    return res.status(400).json({'message':'Email and Pasword are required'})

    const foundUser = await User.findOne({
        where: {
            email : email
        }
    })

    
    if(!foundUser)
    return res.status(400).json({message:'User Detail Invalid'})
    else{
        const match = await bcrypt.compare(password, foundUser.password);
        
        if(match){
            if(role == foundUser.role_id){
            const token = accessToken(foundUser.email)
            res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000})
            res.status(200).send({message:'login success! Now you are Normal user','access-token':token})  }
            else{
                const foundOnlineCounter = await Counter.findOne({
                    where:{
                        status: 0
                    }
                })
                if(!foundOnlineCounter){
                    return res.status(500).send({message:'No counters available'})
                }
                const updateCounter = await Counter.update({
                    status : 1,
                    user_id: foundUser.user_id
                },{
                    where:{
                        counter_id:foundOnlineCounter.counter_id
                    }
                }
                
                )
                foundOnlineCounter.status = 1
                const counter = foundOnlineCounter
                const token = accessToken(foundUser.email)
                res.cookie('jwt',token,{httpOnly:true, maxAge: maxAge*1000})
                res.status(200).send({message:'login success! Now you are Counter user','access-token':token,'your counter is': counter.counter_name})
            }
        }else{ 
            res.status(400).json({'message': 'Email and Password do not match'})
        }
    }
}
//Generate access token
const accessToken = (email) => {
    return jwt.sign({email},process.env.TOKEN_SECRET,{ expiresIn : maxAge })
}


module.exports = {
    registerUser,
    UserLogin
}
