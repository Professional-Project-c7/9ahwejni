const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const packproduct = sequelize.define('packproduct', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
      
    },
    
    description: {
        type: DataTypes.STRING,
        allowNull :false
      },
 
  });
  return packproduct
}