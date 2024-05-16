
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Notification = sequelize.define('Notification', {

 
  amount:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },

  coffeId: {
    type: DataTypes.INTEGER,
   
  }
 
    
  });
  return Notification
}