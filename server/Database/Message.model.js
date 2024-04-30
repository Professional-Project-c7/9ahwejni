const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Message = sequelize.define('Message', {
   
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
  });
  return Message
}