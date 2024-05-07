const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
const Payments = sequelize.define('Payments', {

    amount: {
      type: DataTypes.INTEGER,
    }
  })


  return Payments
}