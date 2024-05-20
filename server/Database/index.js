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
  db.Review = require('./review.model')(connection, DataTypes);
  db.Reviewz = require('./reviewz.model')(connection, DataTypes);
  db.Options = require('./options.model')(connection, DataTypes);
  db.Notification = require('./notification')(connection, DataTypes);
  db.productoptions=require('./productoptions')(connection,DataTypes)



  db.Pack=require('./pack.model')(connection,DataTypes)
  db.Size=require('./size.model')(connection,DataTypes)



  db.Pack.belongsToMany(db.Products,{ through: db.Packproduct });
  db.Products.belongsToMany(db.Pack,{ through: db.Packproduct });

  db.Products.hasMany(db.Size);
  db.Size.belongsTo(db.Products);

  db.Products.belongsToMany(db.Options,{ through: db.productoptions });
  db.Options.belongsToMany(db.Products,{ through: db.productoptions });



  db.User.hasMany(db.Pack);
  db.Pack.belongsTo(db.User);
  
  db.User.hasMany(db.Products);
  db.Products.belongsTo(db.User);


db.User.hasMany(db.Review);
db.Review.belongsTo(db.User);
db.Products.hasMany(db.Review, { foreignKey: 'prodId' });
db.Review.belongsTo(db.Products, { foreignKey: 'prodId' });

// db.User.hasMany(db.Review, { foreignKey: 'coffeeShopId' })
// db.Review.belongsTo(db.User, { foreignKey: 'coffeeShopId' })


db.Reviewz.belongsTo(db.User, { as: 'Reviewer', foreignKey: 'reviewerId' });
db.Reviewz.belongsTo(db.User, { as: 'Reviewee', foreignKey: 'revieweeId' });



// Sync the models with the database

//  connection.sync()
//     .then(() => {
//         console.log('Models synced with the database.')
//     })
//     .catch((error) => {
//         console.error('Unable to sync models with the database: ', error)
//     })

module.exports =db 