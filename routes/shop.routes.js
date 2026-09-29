const express = require("express");
const { getProducts } = require("../controllers/shop");

const shopRouter = express.Router();

shopRouter.get("/getProducts", getProducts);

module.exports = shopRouter;
