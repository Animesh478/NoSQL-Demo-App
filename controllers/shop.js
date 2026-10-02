const Product = require("../models/product");
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

async function postCart(req, res, next) {
  const productId = req.body.productId;
  Product.fetchProduct(productId)
    .then((product) => {
      console.log("product=", product);
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.json({ data: result });
    })
    .catch((err) => console.log(err));
}

async function getCart(req, res, next) {
  req.user
    .getCart()
    .then((products) => {
      res.json({ data: products });
    })
    .catch((err) => console.log(err));
}

async function deleteCartItem(req, res, next) {
  const productId = req.body.productId;
  req.user
    .deleteCartItem(productId)
    .then((result) => {
      return res.json({ data: result, message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete item" });
    });
}

module.exports = {
  getProducts,
  getProduct,
  postCart,
  getCart,
  deleteCartItem,
};
