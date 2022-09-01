//imports
const db = require('../models')
const { sequelize, Sequelize } = require('../models')

//main model
const IssueType = db.issue_types
const Users = db.users

//View all issue types

const normalUsersHomePage = async (req,res) =>{

    let email

    try {
        email = req.email.email
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message : 'Error'})
    }
    if(!email) return res.status(401).send({ 'message' : 'User not logged in'})

    const foundUser = await Users.findOne({
        where:{
            email:email,
            role_id:1
        }
    })
    if(!foundUser) return res.status(401).send({ 'message' : 'U'})
    const issueType = await IssueType.findAll({
    


    })
    res.status(200).send({
        user:foundUser.name,
        IssueType:issueType
    })
}

//normal user logout
const normalUserLogout = async (req,res) =>{
    req.email = null
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({message:'Logout Successfull'})
}

//module export
module.exports={
    normalUsersHomePage,
    normalUserLogout
}