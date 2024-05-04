
const express = require("express");
const router = express.Router();
const {getAll,addOne,updateOne,deleteOne,selectOne}=require('../controller/UserController')





router.get("/",getAll);
router.get("/:id",selectOne);
router.post("/",addOne);
router.patch("/:id",updateOne);
router.delete("/:id",deleteOne);




module.exports = router