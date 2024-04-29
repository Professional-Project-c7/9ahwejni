const db = require('../Database/index'); // Assuming db exports the Sequelize connection and User model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            throw error
    
        }
     },
     selectOne: async function(req, res) {
        try {
            const user = await db.User.findOne({ where: { FirstName: req.params.FirstName } })
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
        throw error
        }
        },

     updateOne:async function(req,res){
        try {
            const user= await db.User.update({
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                            
               
                Email:req.body.Email,
                password:req.body.password,
                PhoneNumber:req.body.PhoneNumber,
                
                
            },{
                where:{
                    id:req.params.id
                }
            })
            res.status(200).send(user)
    
            
        } catch (error) {
            throw error
            
        }
     }
    
}