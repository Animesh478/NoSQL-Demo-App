const express = require("express");
const {
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.post("/addProduct", postAddProduct);
adminRouter.post("/editProduct", postEditProduct);
adminRouter.delete("/deleteProduct", postDeleteProduct);

module.exports = adminRouter;
