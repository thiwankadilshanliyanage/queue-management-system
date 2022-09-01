module.exports = (sequelize, DataTypes) =>{
    const Counter = sequelize.define("counter",{
        counter_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
            allowNull: false
        },
        counter_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        } ,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },
    { 
        timestamps: false 
    })

    return Counter
}