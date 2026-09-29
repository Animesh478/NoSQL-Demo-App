const { fetchAllProducts, fetchProduct } = require("../models/product");

async function getProducts(req, res, next) {
  try {
    const result = await fetchAllProducts();
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, next) {
  const prodId = req.params.prodId;
  try {
    const result = await fetchProduct(prodId);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
};
