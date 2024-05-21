const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const pack = sequelize.define('pack', {
   
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER
      
    },
    
    description: {
        type: DataTypes.STRING
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull :true
      },
    
  });



  return pack
}