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
    Address: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ImageUrl: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    UserType: {
      type: DataTypes.ENUM('coffee', 'client'),
      allowNull: false
    }
  });

  return User;
};
