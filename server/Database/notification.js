
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Notification = sequelize.define('Notification', {

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  amount:{
    type: DataTypes.INTEGER,
  },

  recipient_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
 
    
  });
  return Notification
}