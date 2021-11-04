const express = require("express");
const {signup}=require("./user.controllers")


const router = express.Router();

router.post("/signup", signup);

// router.post("/signin", sginin);




module.exports = router;
