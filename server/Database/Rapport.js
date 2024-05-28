module.exports = (sequelize, DataTypes) => {
    const Rapport = sequelize.define('Rapport', {
     
     
     Description :{
      type : DataTypes.TEXT,
      allowNull: true,
     },

    });

   
    
    return Rapport;
  };