const db = require('../models')
const { sequelize, Sequelize } = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//main model
const User = db.users

////check JWT exists & is verified
const JWTverify = (req, res, next) => {
    const token = req.cookies.jwt  
    const authHeader = req.headers['authorization']
    const acctoken = authHeader && authHeader.split(' ')[1]  
   
    if(token != acctoken) return res.status(403).send({ message : 'Invalid Access Token'})

    if(token !=null){
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                console.log(err.message)
                return res.status(403).send({ message : 'Invalid Access Token'})
            }else{
                // console.log(decodedToken)
                req.email= decodedToken
                next()
            }
        })
    }else{
        return res.status(401).send({ message : 'No Access Token'})
    
    }
    
}

//Current user
const currentUser = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err.message)
                res.locals.user = null
                next()
            }else{
                console.log(decodedToken)
                let User = await User.findAll({
                    attributes:{
                        exclude: 'password'
                    },
                    where: {
                        email : decodedToken.email
                    }
                })
                res.locals.user = User
                next()
            }
        })
    }else{
        res.locals.user = null
        next()
    }
}

module.exports = { JWTverify,currentUser }