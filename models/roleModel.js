module.exports = (sequelize,DataTypes)=>{
   const Role = sequelize.define("role",{
   role_id:{
    type: DataTypes.INTEGER,
    primaryKey:true,
    allowNull: false,
    autoIncrement: true
   },
   role:{
    type: DataTypes.STRING,
    allowNull: false
   }
   },
   { 
    timestamps: false 
})
return Role
}