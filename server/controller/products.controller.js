const db = require('../Database/index')
const axios = require('axios')


module.exports = { 

selectAll :async function(req,res){
    try {
        const product= await db.Products.findAll({
            include: [{ model: db.User}]
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
addOne:async function(req,res){
    try {
        console.log("req" , req.body);
        const product = await db.Products.create(req.body)
        
    res.status(201).send(product)
    } catch (error) {
       console.log(error)
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

