const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite:///:memory:');

module.exports = (sequelize, DataTypes) => {
  const favorit = sequelize.define('favorit', {
    idProd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    idUser: {
      type: DataTypes.STRING,
      allowNull: false
    },
    

  });

  return favorit;
};
