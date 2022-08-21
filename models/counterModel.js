module.exports = (sequelize, DataTypes) =>{
    const Counter = sequelize.define("counter",{
        counter_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,    
        },
        counter_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue__id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        } ,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { 
        timestamps: false 
    })

    return Counter
}