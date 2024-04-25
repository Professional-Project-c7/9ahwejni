const db = require('../Database/index');
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
                Adress:req.body.Adress,              
                category:req.body.category,
                Email:req.body.Email,
                password:req.body.password,
                PhoneNumber:req.body.PhoneNumber,
                size:req.body.size
                
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