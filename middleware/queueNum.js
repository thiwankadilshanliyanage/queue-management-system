const { check } = require('express-validator')
const db = require('../models')
const { sequelize, Sequelize } = require('../models')

//main model
const Issue = db.issues
const Counter = db.counters

const queueNum = async (req,res,next) =>{

    let issueCount  = []

    for(let i = 1; i<= 3; i++){
        const checkOnline = await Counter.findOne({
            where:{
                counter_id: i
            }
        })
        let counterOnline  = checkOnline.status
        if(counterOnline){
            const getIssueCount = await Issue.count({
                where:{
                    counter_id:i,
                    status:0
                }
            })
            issueCount[i-1]=getIssueCount
        }else{
            issueCount[i-1]=Infinity
        }
    }
    let freeQue  = 0
    if(issueCount[0]==Infinity && issueCount[1]==Infinity && issueCount[2]==Infinity){
        return res.status(500).send({message:'No Counters available'})
    }
    if(issueCount[0]<issueCount[1] && issueCount[0]<issueCount[2]){
        freeQue = 1
    }else if(issueCount[1]<issueCount[2]){
        freeQue = 2
    }else{
        freeQue = 3
    }
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
    req.body.queueNum = maxnum
    req.body.counter = freeQue
    return next()
}
module.exports={
    queueNum
}