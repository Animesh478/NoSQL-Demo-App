const express = require("express");
const { getProducts, getProduct } = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/getProducts", getProducts);
shopRouter.get("/getProduct/:prodId", getProduct);

module.exports = shopRouter;
