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
    const userCount = 5;
    const productCount = 5;
    const packCount = 5;
    const reviewCount = 5;
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
          const category = getRandomElementFromArray(["coffee", "cake", "drink"]); // Adjusted category options
          
          let imgUrl;
          if (category === "coffee") {
              imgUrl = faker.image.imageUrl(400, 400, "coffee", true, true);
          } else if (category === "cake") {
              imgUrl = faker.image.imageUrl(400, 400, "cake", true, true);
          } else {
              imgUrl = faker.image.imageUrl(400, 400, "drink", true, true);
          }
  
          return await db.Products.create({
              name: faker.commerce.product(),
              price: faker.commerce.price(),
              imgUrl: imgUrl,
              description: faker.commerce.productDescription(),
              userId: user.id,
              size: getRandomElementFromArray(["S", "M", "L"]),
              category: category,
          });
      })
  );
  const reviews = await Promise.all(
    Array.from({ length: reviewCount }).map(async () => {
      const user = users[Math.floor(Math.random() * userCount)];
      const product = Products[Math.floor(Math.random() * productCount)];
      return await db.Review.create({
        stars: getRandomElementFromArray([1, 2, 3, 4, 5]),
        comment: faker.commerce.productDescription(),
        userId: user.id,
        prodId: product.id
      });
    })
  );

  const pack = await Promise.all(
    Array.from({ length: packCount }).map(async () => {
        const category = getRandomElementFromArray(["food", "coffee"]); // Randomly select category
        const user = users[Math.floor(Math.random() * userCount)];
        let name, description;
        if (category === "food") {
            // If the category is food, generate food-related data
            name = faker.commerce.productName();
            description = faker.commerce.productDescription();
        } else {
            // If the category is coffee, generate coffee-related data
            name = faker.random.word() + " Coffee Pack";
            description = faker.lorem.sentence();
        }
        let imgUrl;
        if (category === "coffee") {
            imgUrl = faker.image.imageUrl(400, 400, "coffee", true, true);
        } else if (category === "cake") {
            imgUrl = faker.image.imageUrl(400, 400, "cake", true, true);
        } else {
            imgUrl = faker.image.imageUrl(400, 400, "drink", true, true);
        }
        return await db.Pack.create({
            name: name,
            price: faker.commerce.price(),
            description: description,
            category: category,
            userId: user.id,
            imgUrl: imgUrl,
        });
    })
);


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



      // Create Reviews
  

  console.log('Reviews seeded successfully.');
};