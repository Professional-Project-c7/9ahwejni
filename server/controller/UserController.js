const db = require('../Database/index'); // Assuming db exports the Sequelize connection and User model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const upload = multer({ dest: 'uploads/' });
// cloudinary.config({
//     cloud_name: 'dmqumly45',
//     api_key: '739151141682318',
//     api_secret: 'lwkhlYbntud_BfDr3ys9jLHKiRM'
//   });

module.exports = {
   
    addOne:async function(req,res){
        try {
            const user= await db.User.create(req.body)
            res.status(200).send(user)
            
        } catch (error) {
            res.status(500).json(error)
            
        }
    
    
     },
     getAll :async function(req,res){
        try {
            const user= await db.User.findAll({})
            res.status(200).send(user)
    
        } catch (error) {
           console.log(error)
    
        }
     },
     selectOne: async function(req, res) {
        try {
            const user = await db.User.findOne({ where: { id: req.params.id } })
                res.status(200).json(user);
        
        } catch (error) {
           console.log(error);
        }
    
        },
     deleteOne:async (req, res) => {
        try {
        const product = await db.User.destroy({
            where: { id: req.params.id },
        })
    
        res.json(product);
        } catch (error) {
       console.log(error)
        }
        },

        updateOne: async (req, res)  => {
            const { id } = req.params;
            const { FirstName, LastName, email, password,ImageUrl } = req.body;

            try {
                // Find the user by ID
                let user = await db.User.findByPk(id);

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                // Update the user
                user.FirstName = FirstName || user.FirstName;
                user.LastName = LastName || user.LastName;
                user.Email = email||  user.Email;
                // user.Address = Address  ||user.Address;
                user.ImageUrl= ImageUrl|| user.ImageUrl
 
                // Hash the password if it is being updated
                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);
                }

                // Save the updated user
                await user.save();

                return res.status(200).json({ user });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Server Error' });
            }
        }}
          