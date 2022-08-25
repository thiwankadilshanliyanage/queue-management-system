module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'thiwanka123',
    DB:'queuemangement',
    dialect:'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}