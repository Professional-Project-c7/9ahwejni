

module.exports=(sequelize,DataTypes)=>{
  const pack = sequelize.define('option', {
   option:{
    type: DataTypes.ENUM("Small","Medium","Large"),
    defaultValue:"Medium",
      allowNull: false
   }, 
   price: {
    type: DataTypes.INTEGER
    
  } 
  });
  return pack
}