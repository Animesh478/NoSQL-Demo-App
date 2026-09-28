const express = require("express");
const { postAddProduct } = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.post("/addProduct", postAddProduct);

module.exports = adminRouter;
