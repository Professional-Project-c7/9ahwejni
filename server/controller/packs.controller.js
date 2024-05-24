const db = require('../Database/index')
// const axios = require('axios')


module.exports = { 

selectAll :async function(req,res){
    try {
        const pack= await db.Pack.findAll({
            include:{
                model:db.Products
            }
        })
        res.status(200).send(pack)
        
    } catch (error) {
       console.log(error)
        
    }

    },   
// selectOne: async function(req, res) {
//     try {
//         const pack = await db.Pack.findOne({ where: { id: req.body.userId } })
//             res.status(200).json(pack);
    
//     } catch (error) {
//         throw (error)
//     }

//     },
addOne:async function(req,res){
    try {
       
        const pack = await db.Pack.create(req.body)
        req.body.checkedProductIDs.map(async(e)=>{
            await db.Packproduct.create({ 
                prodId:e,
                packId:pack.id,
                ...req.body

            })
        })
        
    res.status(201).send(pack)
    } catch (error) {
       console.log(error)
    }
    },
deleteOne:async (req, res) => {
    try {
    const pack = await db.Pack.destroy({
        where: { id: req.params.id },
    })

    res.json(pack);
    } catch (error) {
   console.log(error)
    }
    },
UpdateOne :async (req, res) => {
    try {
    const pack = await db.Pack.update(req.body, {
        where: { id: req.params.id },
    })

    res.status(201).send(pack)
    } catch (error) {
   console.log(error)
} 
},

 selectOne:async function(req,res){
    try { 
        const findId=req.params.id
        const project = await db.Pack.findAll({ where: { userId: findId } })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 SelectByName:async function(req,res){
    try { 
        const find=req.params.name
        const project = await db.Pack.findAll({ where: { name: find } })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 SelectByCategory:async function(req,res){
 try { 
    const findcateg=req.params.category
        const project = await db.Pack.findAll({ where: {  category :findcateg} })
        res.send(project)
    }
    catch { (error)=> {console.log(error)} }
 },
 myPacks:async function(req,res){
    try {
        const findId=req.params.userid
        const project = await db.Pack.findAll()
        res.send(project)
        } catch (error) {
       console.log(error)
    } 

 }
}

