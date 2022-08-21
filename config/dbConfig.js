module.exports = {
    HOST:'localhost',
    USER:'root',
    PASSWORD:'thiwanka123',
    DB:'queue_management_system',
    dialect:'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}