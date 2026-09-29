const { fetchAllProducts } = require("../models/product");

async function getProducts(req, res, next) {
  try {
    const result = await fetchAllProducts();
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
};
