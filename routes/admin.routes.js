const express = require("express");
const { postAddProduct, postEditProduct } = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.post("/addProduct", postAddProduct);
adminRouter.post("/editProduct", postEditProduct);

module.exports = adminRouter;
