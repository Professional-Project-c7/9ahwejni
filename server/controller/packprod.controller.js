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
            throw (error)
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

     updateOne:async function(req,res){

        try {
            console.log(req.params);

            const user= await db.User.update({
                Name:req.body.name,
                Price:req.body.price,
                            
               
                Description:req.body.description,
                
                
                
            },{
                where:{
                    id:req.params.id
                }
            })
            res.status(200).send(user)
    
            
        } catch (error) {
           console.log(error)
            
        }
     },
    
    

// Endpoint to handle file upload
// upload:async function(req,res){
//   try {
//     // Upload file to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path);

//     // Send the secure URL of the uploaded image back to the client
//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ error: 'Failed to upload image' });
//   }
// }
}
