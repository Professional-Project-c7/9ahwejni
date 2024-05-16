const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Productoptions = sequelize.define('Productoptions', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull :true
    },
    description: {
        type: DataTypes.STRING,
        allowNull :false
      },
      
     
      
  
  });
  return Productoptions
}