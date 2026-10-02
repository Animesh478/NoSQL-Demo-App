const express = require("express");
const {
  getProducts,
  getProduct,
  postCart,
  getCart,
} = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/getProducts", getProducts);
shopRouter.get("/getProduct/:prodId", getProduct);
shopRouter.post("/addCart", postCart);
shopRouter.get("/getCart", getCart);

module.exports = shopRouter;
