const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:///:memory:');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
   
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
    LastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
   
    PhoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });

  return User;
};
