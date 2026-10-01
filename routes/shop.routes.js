const express = require("express");
const { getProducts, getProduct, postCart } = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/getProducts", getProducts);
shopRouter.get("/getProduct/:prodId", getProduct);
shopRouter.post("/addCart", postCart);

module.exports = shopRouter;
