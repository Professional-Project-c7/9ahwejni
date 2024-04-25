const db = require('../Database/index'); // Assuming db exports the Sequelize connection and User model

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register: async (req, res) => {
        const { FirstName, LastName, Email, password, UserTypes } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        try {
            const user = await db.User.create({ FirstName, LastName, Email, password: hashedPassword, UserTypes });
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Registration failed' });
        }
        
    },
    login: async (req, res) => {
        try {
            const { Email, password } = req.body;
            const user = await db.User.findOne({ where: { Email } });
    
            if (!user) {
                return res.status(401).json({ error: 'Invalid user' });
            }
    
            const correctPass = await bcrypt.compare(password, user.password);
            if (!correctPass) {
                return res.status(401).json({ error: 'Wrong password' });
            }
    
            const token = jwt.sign({ id: user.id }, "mlop09", { expiresIn: "1h" });
            res.status(200).json({ token, FirstName: user.FirstName, LastName: user.LastName });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
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