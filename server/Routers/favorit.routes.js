const express = require("express");
const router = require('express').Router();

// const verifyToken = require ('../middelware/index.js');


const {selectAll,addOne,deleteOne}=require('../controller/favorit.controller')



router.get("/",selectAll);
router.post("/",addOne);
router.delete("/:id",deleteOne);


module.exports = router;
