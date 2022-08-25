module.exports = (sequelize, DataTypes) =>{
    const Notification = sequelize.define("notification",{
        notification_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,  
            autoIncrement: true,
            allowNull: false  
        },
        notification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { 
        timestamps: false 
    })

    return Notification
}