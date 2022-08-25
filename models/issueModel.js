module.exports = (sequelize, DataTypes) =>{
    const Issue = sequelize.define("issue",{
        issue_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,    
            autoIncrement: true,
            allowNull: false
        },
        issue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issue_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        } ,
        queue_no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },counter_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    { 
        timestamps: false 
    })

    return Issue
}