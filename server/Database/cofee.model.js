const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:///:memory:');

module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define('cofee', {
   
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
    imgUrl: {
      type: DataTypes.STRING,
      allowNull :false
    },
    Adress: {
      type: DataTypes.GEOMETRY,
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }

  });

  return Coffee;
};
