
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Notification = sequelize.define('Notification', {

 
  token:{
    type: DataTypes.STRING,
    allowNull: false
  }
  
 
    
  });
  return Notification
}