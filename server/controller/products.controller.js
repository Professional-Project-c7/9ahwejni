const db = require('../Database/index')
const axios = require('axios')


module.exports = { 

selectAll :async function(req,res){
    try {
        const product= await db.Products.findAll({
            include: [{ model: db.Options}]
        })
        res.status(200).send(product)
        
    } catch (error) {
       console.log(error)
        
    }

    },   
selectOne: async function(req, res) {
    try {
        const product = await db.Products.findOne({ where: { id: req.params.id } })
            res.status(200).json(product);
    
    } catch (error) {
       console.log(error);
    }

    },
    addOne: async function(req, res) {
        try {
            console.log("req", req.body);
            
            const product = await db.Products.create(req.body);
           const createArr=req.body.options.map((e)=>{
            return {
                price:e.price,
                option:e.option,
                prodId:product.id,
                
                
            }
           }) 
            
            const option = await db.Options.bulkCreate(createArr)
            
            
            // const productOption = await db.productoptions.create({
            //     name: product.name, 
            //     price: product.price,
            //     description: product.description,
            //     
            //     prodId: product.id,
            //     optionId: option.id 
            // });
            
            
            res.status(201).send({ product, option,  });
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },
    
deleteOne:async (req, res) => {
    try {
    const product = await db.Products.destroy({
        where: { id: req.params.id },
    })

    res.json(product);
    } catch (error) {
   console.log(error)
    }
    },
UpdateOne :async (req, res) => {
    try {
    const product = await db.Products.update(req.body, {
        where: { id: req.params.id },
    })

    res.status(201).send(product)
    } catch (error) {
   console.log(error)
} 
},

 selectOne:async function(req,res){
    try { 
        const findId=req.params.id
        const project = await db.Products.findAll({ where: { id: findId } })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 SelectByName:async function(req,res){
    try { 
        const find=req.params.name
        const project = await db.Products.findAll({ where: { name: find } })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 SelectByCategory:async function(req,res){
 try { 
    const findcateg=req.params.category
        const project = await db.Products.findAll({ where: {  category :findcateg} })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 myProducts:async function(req,res){
    try {
        const findId=req.params.userid
        const project = await db.Products.findAll()
        res.send(project)
        } catch (error) {
       console.log(error)
    } 

 }
}