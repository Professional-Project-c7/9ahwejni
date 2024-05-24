const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAudio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isImage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });
  return Message;
};
