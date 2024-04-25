const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

module.exports=(sequelize,DataTypes)=>{
  const Products = sequelize.define('prods', {
   
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER
      
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull :false
    },
    description: {
        type: DataTypes.STRING,
        allowNull :false
      },
      
    size: {
        type: DataTypes.STRING,
        allowNull :false
      },
      category: {
        type: DataTypes.ENUM("pack","product"),
         allowNull: false,
         defaultValue: "product",
      },
  });
  return Products
}