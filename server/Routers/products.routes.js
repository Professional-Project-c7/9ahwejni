const express = require("express");
const router = require('express').Router();



const {selectAll,selectOne,addOne,deleteOne,UpdateOne,SelectByName,SelectByCategory,myProducts}=require('../controller/products.controller')


router.get("/myProducts/",myProducts);
router.get("/SearchById/:id",selectOne)
router.get("/SearchByName/:name",SelectByName)
router.get("/SearchByCategory/:category",SelectByCategory)
router.get("/",selectAll);
router.get("/:id",selectOne);
router.post("/",addOne);
router.delete("/:id",deleteOne);
router.patch("/:id",UpdateOne);


module.exports = router;
