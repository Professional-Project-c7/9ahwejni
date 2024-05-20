module.exports = (sequelize, DataTypes) => {
  const Reviewz = sequelize.define('Reviewz', {
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    revieweeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  });

  Reviewz.associate = (models) => {
    Reviewz.belongsTo(models.User, { as: 'Reviewer', foreignKey: 'reviewerId' });
    Reviewz.belongsTo(models.User, { as: 'Reviewee', foreignKey: 'revieweeId' });
  };

  return Reviewz;
};
