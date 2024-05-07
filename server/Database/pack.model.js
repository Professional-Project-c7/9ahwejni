const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const pack = sequelize.define('pack', {
   
    name: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
      
    },
    
    description: {
        type: DataTypes.STRING,
        // allowNull :false
      },
      
    
  });
  return pack
}