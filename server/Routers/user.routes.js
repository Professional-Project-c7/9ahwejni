
const express = require("express");
const router = express.Router();
const {register,login,getAll,addOne,updateOne,deleteOne}=require('../controller/UserController')

const verifyToken=require('./../middelware/index')

router.post("/register",register);
router.post("/login",login)
router.get("/currentUser",verifyToken);

router.get("/",getAll);
router.post("/",addOne);
router.patch("/:id",updateOne);
router.delete("/:id",deleteOne);





module.exports = router