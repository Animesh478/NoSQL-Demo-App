const Product = require("../models/product");
// const { fetchAllProducts, fetchProduct } = require("../models/product");

async function getProducts(req, res, next) {
  try {
    const result = await Product.find().populate("userId");
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(req, res, next) {
  const prodId = req.params.prodId;
  try {
    const result = await Product.findById(prodId);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
  }
}

async function postCart(req, res, next) {
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    const result = await req.user.addToCart(product);
    res.json({ data: result, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot add product to cart" });
  }
}

async function getCart(req, res, next) {
  try {
    const products = await req.user.populate("cart.items.productId");
    res.json({ data: products.cart.items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function deleteCartItem(req, res, next) {
  const productId = req.body.productId;
  req.user
    .removeFromCart(productId)
    .then((result) => {
      return res.json({ data: result, message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to delete item" });
    });
}

async function postAddOrder(req, res, next) {
  req.user
    .addOrder()
    .then((result) => res.json({ data: result }))
    .catch((err) => res.status(500).json({ message: "Internal server error" }));
}

async function getOrder(req, res, next) {
  req.user
    .fetchOrder()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = {
  getProducts,
  getProduct,
  postCart,
  getCart,
  deleteCartItem,
  postAddOrder,
  getOrder,
};
