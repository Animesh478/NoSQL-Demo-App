const express = require("express");
const {
  getProducts,
  getProduct,
  postCart,
  getCart,
  deleteCartItem,
  postAddOrder,
} = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/getProducts", getProducts);
shopRouter.get("/getProduct/:prodId", getProduct);
shopRouter.post("/addCart", postCart);
shopRouter.get("/getCart", getCart);
shopRouter.delete("/deleteCartItem", deleteCartItem);
shopRouter.post("/addOrder", postAddOrder);

module.exports = shopRouter;
