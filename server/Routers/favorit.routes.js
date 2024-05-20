const express = require("express");
const router = require('express').Router();

// const verifyToken = require ('../middelware/index.js');


const {selectAll,addOne,deleteOne,selectOne}=require('../controller/favorit.controller')


router.get("/:id",selectOne)

router.get("/",selectAll);
router.post("/",addOne);
router.delete("/:id",deleteOne);


module.exports = router;
