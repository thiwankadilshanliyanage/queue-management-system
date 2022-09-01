const db = require('../models')
const { sequelize, Sequelize } = require('../models')

//main models
const Issue = db.issues
const Users = db.users

const addIssue = async(req,res)=>{
    const IssueType = req.query.issutype
    const issue = req.body.issue
    
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
            email:email
        }
    })
    if(!foundUser) return res.status(401).send({ 'message' : 'U'})

    const user_id = foundUser.user_id
    const queue_no = req.body.queueNum
    const counter_id = req.body.counter

    const createIsue = Issue.create({
        issue : issue,
        issue_type_id:IssueType,
        user_id:user_id,
        queue_no:queue_no,
        counter_id:counter_id
    },{fields:['issue','issue_type_id','user_id','queue_no','counter_id']})
    return res.send({createIsue})
}
module.exports = {
    addIssue
}