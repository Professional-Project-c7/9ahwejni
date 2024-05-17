
const express = require("express");
const router = express.Router();
const {Posts,Posting}=require('../controller/notification')





router.post("/send-notification",Posts);
router.post("/register",Posting);
// router.post("/",addOne);





module.exports = router