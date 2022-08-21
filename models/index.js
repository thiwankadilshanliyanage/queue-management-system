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