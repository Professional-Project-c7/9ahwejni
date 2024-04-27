
const express = require("express");
const router = express.Router();
const {getAll,addOne,updateOne,deleteOne}=require('../controller/UserController')





router.get("/",getAll);
router.post("/",addOne);
router.patch("/:id",updateOne);
router.delete("/:id",deleteOne);





module.exports = router