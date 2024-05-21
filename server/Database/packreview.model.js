module.exports = (sequelize, DataTypes) => {
    const PackReview = sequelize.define('PackReview', {
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    
    });
  
    // Associate PackReview with Pack and User
    PackReview.associate = (models) => {
      PackReview.belongsTo(models.Pack);
      PackReview.belongsTo(models.User);
    };
  
    return PackReview;
  };
  