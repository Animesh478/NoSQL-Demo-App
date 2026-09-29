const mongodb = require("mongodb");
const Product = require("../models/product");

const postAddProduct = function (req, res) {
  // console.log("inside admin controller");
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product(title, description, price, imageUrl);

  product
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = function (req, res) {
  // console.log("inside admin controller");
  const prodId = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product(
    title,
    description,
    price,
    imageUrl,
    new mongodb.ObjectId(prodId),
  );

  product
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => console.log(err));
};

const postDeleteProduct = function (req, res, next) {
  const prodId = req.body.id;
  Product.deleteProduct(prodId)
    .then(() => {
      return res.json({ message: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = {
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
};
