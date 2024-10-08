module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
     
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 5 }
      }
     ,
     comment :{
      type : DataTypes.TEXT,
      allowNull: true,
     },

    });

   
    
    return Review;
  };