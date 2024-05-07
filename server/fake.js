const { Sequelize } = require('sequelize');
const db = require('./Database/index')
const { faker ,Randomizer} = require('@faker-js/faker');
const bcrypt =require("bcrypt");
const { random } = require('lodash');
// const counter = 
function getRandomElementFromArray(arr) {
    // Generate a random index within the bounds of the array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Return the element at the random index
    return arr[randomIndex];
  }
module.exports = async (sequelize) => {
    // Adjust the number of seeds you want for each model
    const userCount = 50;
    const productCount = 100;
    const packCount = 50;
    // Generate random users
    const users = await Promise.all(
      Array.from({ length: userCount }).map(async () => {
        return await db.User.create({
            FirstName: faker.person.firstName(),
            LastName: faker.person.lastName(),
            Email: faker.internet.email(),
            Password: await bcrypt.hash("12345", 10), // Replace with a secure password hashing mechanism
          phoneNumber: faker.phone.number(), // Uncomment if you want phone numbers
          age: faker.number.int({ min: 19, max: 65 }), // Uncomment if you want user ages
          Address:faker.location.streetAddress(),
          ImageUrl:faker.image.url(),
          UserType: getRandomElementFromArray(["coffee","client"]),

        alt:faker.location.latitude({ max: 10, min: -10, precision: 5 }), 
        long:faker.location.longitude({ max: 10, min: -10 })
        });
      })
    );
    const Products = await Promise.all(
        Array.from({ length: productCount }).map(async () => {
          const user = users[Math.floor(Math.random() * userCount)];
          return await db.Products.create({
            name: faker.commerce.product(),
            price: faker.commerce.price(),
            imgUrl:faker.image.url(),
            description:faker.commerce.productDescription(),
            UserId: user.id, 
            size: getRandomElementFromArray(["S","M","L"]),

           
          });
        })
      );
      

      const pack =await Promise.all(
        Array.from({ length: packCount }).map(async () => {
         
          return await db.Pack.create({
            name: faker.person.firstName(),
            price: faker.commerce.price(),
            description:faker.person.firstName(),
           
          });
        })
      )

      const packproduct =await Promise.all(
        Array.from({ length: packCount }).map(async () => {
            const onepack = pack[Math.floor(Math.random() * packCount)];

          const oneproduct = Products[Math.floor(Math.random() * packCount)];

          return await db.Packproduct.create({
            packId:onepack.id,
            prodId:oneproduct.id
          });
        })
      )



      const Review =await Promise.all(
        Array.from({ length: 50 }).map(async () => {
            const user = users[Math.floor(Math.random() * userCount)];
            const oneproduct = Products[Math.floor(Math.random() * packCount)];

          return await db.Review.create({
            stars:getRandomElementFromArray([1,2,3,4,5]),
            comment:faker.commerce.productDescription(),
            userId:user.id,
            prodId:oneproduct.id
          });
        })
      )
      

}