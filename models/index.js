//import pkges
const dbConfig = require('../config/dbConfig.js');
const{Sequelize,DataTypes}= require('sequelize');

//assigning DB configuration to Sequelize
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)
//Authunticate to db throug seulize
sequelize.authenticate()
.then(()=>{
    console.log('connected..')
})
.catch(err=>{
    console.log('Error'+err)
})
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//assign models to db table
db.counters = require('./counterModel.js')(sequelize,DataTypes)
db.issues = require('./issueModel.js')(sequelize,DataTypes)
db.issue_types = require('./issue_typeModel.js')(sequelize,DataTypes)
db.notifications = require('./notificationModel.js')(sequelize,DataTypes)
db.roles = require('./roleModel.js')(sequelize,DataTypes)
db.users = require('./userModel.js')(sequelize,DataTypes)

//syncronize db tables

    
db.sequelize.sync({force:false})
.then(()=>{
    console.log("sync-done")
})


//relationships(foreignkey)

//issue type has many issues
db.issue_types.hasMany(db.issues,{
    foreignKey:'issue_type_id',
    as:'issue'
})

db.issues.belongsTo(db.issue_types,{
    foreignKey:'issue_type_id',
    as:'issueType'
})

//counter has many issues

db.counters.hasMany(db.issues,{
    foreignKey:'counter_id',
    as:'issue'
})

db.issues.belongsTo(db.counters,{
    foreignKey:'counter_id',
    as:'counter'
})

//user has many issues

db.users.hasMany(db.issues,{
    foreignKey:'user_id',
    as:'issue'
})

db.issues.belongsTo(db.users,{
    foreignKey:'user_id',
    as:'user'
})

//issues has many notifications

db.issues.hasMany(db.notifications,{
    foreignKey:'issue_id',
    as:'notification'
})
db.notifications.belongsTo(db.issues,{
    foreignKey:'issue_id',
    as:'issue'
})

//user has many notification

db.users.hasMany(db.notifications,{
    foreignKey:'user_id',
    as:'notification'
})
db.notifications.belongsTo(db.users,{
    foreignKey:'user_id',
    as:'user'
})

//role has many users
db.roles.hasMany(db.users,{
    foreignKey:'role_id',
    as:'user'
})
db.users.belongsTo(db.roles,{
    foreignKey:'role_id',
    as:'role'
})

//users has many counters
db.users.hasMany(db.counters,{
    foreignKey:'user_id',
    as:'counter'
})
db.counters.belongsTo(db.users,{
    foreignKey:'user_id',
    as:'user'
})

//finally export module
module.exports = db