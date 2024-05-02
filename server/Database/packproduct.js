const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const packproduct = sequelize.define('packproduct', {
   
 
  });
  return packproduct
}