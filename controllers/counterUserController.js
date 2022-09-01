//imports
const db = require('../models')
const { sequelize, Sequelize, categories } = require('../models')

//main model
const Users = db.users
const Counter = db.counters

//logout counter user
const counterUserLogout = async(req,res) =>{
   


    let email

    try {
        email = req.email
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message : 'Error'})
    }
    if(!email) return res.status(401).send({ 'message' : 'User not logged in'})

    const foundUser = await Users.findOne({
        where:{
            role_id:2
        }
    })
    if(!foundUser) return res.status(401).send({ 'message' : 'U'})

    const updateCounter = await Counter.update({
        status:0,
        user_id : null
    },{
        where:{
            user_id : foundUser.user_id
        }
    }
    )

    req.email = null
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({message:'Logout Successfull'})
   
}

module.exports = {
    counterUserLogout
}