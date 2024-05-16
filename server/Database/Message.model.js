const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // Assume '1' corresponds to the 'global' room
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Message;
};
