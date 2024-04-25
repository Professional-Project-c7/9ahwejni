
const express = require("express");
const router = express.Router();
const {register,login}=require('../controller/UserController')

const verifyToken=require('./../middelware/index')

router.post("/register",register);
router.post("/login",login)
router.get("/currentUser",verifyToken);







module.exports = router