module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
        ,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
        ,
        references: {
          model: 'prods',
          key: 'id'
        }
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });
    
    return Review;
  };