const db = require('../Database/index');
module.exports = { 


    addOne:async function(req,res){
        try {
            console.log(req.body, 'xx')
            const user= await db.Coffee.create(req.body)
            res.status(200).json(user)
        
        } catch (error) {
            res.status(500).send(error)
            
        }
    
    
     },
     getAll :async function(req,res){
        try {
            
            const user= await db.Coffee.findAll({
                include:db.User
            })
            res.status(200).send(user)
    
        } catch (error) {
           console.log(error)
    
        }
     },
     deleteOne:async (req, res) => {
        try {
        const product = await db.Coffee.destroy({
            where: { id: req.params.id },
        })
    
        res.json(product);
        } catch (error) {
       console.log(error)
        }
        },

     updateOne:async function(req,res){
        try {
            const user= await db.Coffee.update({
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                Adress:req.body.Adress,              
                category:req.body.category,
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
           console.log(error)
            
        }
     }






 }