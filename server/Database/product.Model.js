const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Products = sequelize.define('prods', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull :true
    },
    description: {
        type: DataTypes.STRING,
        allowNull :false
      },
      
      // category: {
      //   type: DataTypes.ENUM('coffee', 'cake','juice'),
      //   allowNull: false
      // }
      
  
  });
  return Products
}