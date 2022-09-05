//imports
const db = require('../models')
const { sequelize, Sequelize, categories } = require('../models')

//main model
const Users = db.users
const Counter = db.counters
const Issue = db.issues

//logout counter user
const counterUserLogout = async(req,res) =>{
   
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
            role_id:2
        }
    })
    if(!foundUser) return res.status(401).send({ 'message' : 'U'})

    const foundCounter = await Counter.findOne({
        where:{
            user_id:foundUser.user_id
        }
    })

    const updateCounter = await Counter.update({
        status:0,
        user_id : null
    },{
        where:{
            user_id : foundUser.user_id
        }
    }
    )







    let countIssue = []

    for(let i =1; i<3; i++){
        const checkCounter = await Counter.findOne({
            where:{
                counter_id:i
            }
        })
        let counterOnline = checkCounter.status
        if(counterOnline){
            const getIssueCount = await Issue.count({
                where:{
                    counter_id:i,
                    status :0
                }
            })
            countIssue[i-1] = getIssueCount
        }else{
            countIssue[i-1] = Infinity 
        }
    }
    let freeQue  = 0

    if(countIssue[0]==Infinity && countIssue[1]==Infinity && countIssue[2]==Infinity){
        return res.status(500).send({message:'No Counters available'})
    }
    if(countIssue[0]<countIssue[1] && countIssue[0]<countIssue[2]){
        freeQue = 1
    }else if(countIssue[1]<countIssue[2]){
        freeQue = 2
    }else{
        freeQue = 3
    }
   
    const freeCounter = await Counter.findOne({
        where:{
            counter_id:freeQue
        }
    })

    const chengingIssue = await Issue.findAndCountAll({
        where:{
            counter_id:foundCounter.counter_id,
            status:0
        }
    })
    console.log(chengingIssue)
    for(let n=0;n<chengingIssue.count;n++){
        let getIssueId = chengingIssue.rows[n].issue_id
        const lastQueNum = await Issue.max('queue_no',{
            where:{
                counter_id:freeQue
            }
            
        })
         let maxnum 
        if(lastQueNum == null){
            maxnum = 1
        }else{
            maxnum = lastQueNum + 1
        }
        const updateIssue = await Issue.update({
            queue_no:maxnum,
            counter_id:freeCounter.counter_id
        },{
            where:{
                issue_id:getIssueId
            }
        })
    }










    req.email = null
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({message:'Logout Successfull'})
   
}

module.exports = {
    counterUserLogout
}