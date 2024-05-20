const express = require("express");
const router = require('express').Router();

// const verifyToken = require ('../middelware/index.js');


const {selectAll,selectOne,addOne,deleteOne,UpdateOne,SelectByName,SelectByCategory,myProducts}=require('../controller/products.controller')

// router.post("/verify", verifyToken, addOne);
// router.patch("/:id", verifyToken, UpdateOne);
// router.delete("/:id", verifyToken, deleteOne);

router.get("/myProducts",myProducts);
router.get("/SearchById/:id",selectOne)
router.get("/SearchByName/:name",SelectByName)
router.get("/SearchByCategory/:category",SelectByCategory)
router.get("/",selectAll);


// router.get("/:id",selectOne);
router.post("/",addOne);
router.delete("/:id",deleteOne);
router.patch("/:id",UpdateOne);


module.exports = router;
