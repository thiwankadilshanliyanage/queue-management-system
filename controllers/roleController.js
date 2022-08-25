const db = require('../models')
const { sequelize, Sequelize } = require('../models')

//main model
const Role = db.roles
const User = db.users

//get all roles with count of users
const getAllRoles =  async (req,res) => {
    const role = await Role.findAll({
        attributes: {
            include:[
                [sequelize.fn('COUNT',sequelize.col('user.user_id')),'userCount']
            ]
        },
        include:[{
            model:User,
            as:'user',
            attributes:[]
        }],
        group:['role.role_id'],
        order:sequelize.literal('userCount DESC')
    })
    res.status(200).send({
        role:role
    })
}
//module export
module.exports={
    getAllRoles
}