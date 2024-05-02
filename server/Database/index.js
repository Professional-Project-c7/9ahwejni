
const mysql = require('mysql2')
const { name, password } = require('../config');


const { Sequelize ,DataTypes } = require('sequelize')
const connection = new Sequelize('9ahwejni', name, password, {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});
 



async function connectionTest (){
  try {
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
  connectionTest()
  const db={}
  db.User=require('./UserModel')(connection,DataTypes)
  db.Products=require('./product.Model')(connection,DataTypes)
  db.Coffee=require('./cofee.model')(connection,DataTypes)
  db.Message=require('./Message.model')(connection,DataTypes)
  db.Packproduct=require('./packproduct')(connection,DataTypes)




  db.Pack=require('./pack.model')(connection,DataTypes)
  db.Size=require('./size.model')(connection,DataTypes)

  db.Pack.belongsToMany(db.Products,{ through: db.Packproduct });
  db.Products.belongsToMany(db.Pack,{ through: db.Packproduct });


  db.Products.hasMany(db.Size);
  db.Size.belongsTo(db.Products);




  db.User.hasMany(db.Products);
  db.Products.belongsTo(db.User);
  db.Coffee.hasMany(db.Products);
  db.Products.belongsTo(db.Coffee)
  db.Coffee.hasMany(db.User);
  db.User.belongsTo(db.Coffee)


  






  

// Sync the models with the database
//  connection.sync()
//     .then(() => {
//         console.log('Models synced with the database.')
//     })
//     .catch((error) => {
//         console.error('Unable to sync models with the database: ', error)
//     })

module.exports = db