const express = require("express");
const router = require('express').Router();

// const verifyToken = require ('../middelware/index.js');


const {selectAll,selectOne,addOne,deleteOne,UpdateOne,SelectByName,SelectByCategory,myPacks}=require('../controller/packs.controller')



router.get("/myPacks",myPacks);
router.get("/SearchById/:id",selectOne)
router.get("/SearchByName/:name",SelectByName)
router.get("/SearchByCategory/:category",SelectByCategory)
router.get("/",selectAll);
// router.get("/:id",selectOne);
router.post("/",addOne);
router.delete("/:id",deleteOne);
router.patch("/:id",UpdateOne);


module.exports = router;
