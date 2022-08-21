module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("user",{
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },contact:{
            type: DataTypes.STRING,
            allowNull: false
        },email:{
            type: DataTypes.STRING,
            allowNull: false
        },password: {
            type: DataTypes.STRING,
            allowNull: false
        }, role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps:false
    }
    )
    return User
}