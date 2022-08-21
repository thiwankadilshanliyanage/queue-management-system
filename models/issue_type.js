module.exports = (sequelize, DataTypes) =>{
    const IssueType = sequelize.define("issueType",{
        issue_type_id: {
            type: DataTypes.INTEGER,
            primaryKey:true,  
        },
        
        issue_type: {
            type: DataTypes.STRING,
            allowNull: false 
        }
        
    },
    { 
        timestamps: false 
    })

    return IssueType
}