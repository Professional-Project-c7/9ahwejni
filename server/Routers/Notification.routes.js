
const express = require("express");
const router = express.Router();
const {getAll,addOne,selectOne}=require('../controller/Notification.controller')





router.get("/",getAll);
router.get("/:id",selectOne);
router.post("/",addOne);





module.exports = router