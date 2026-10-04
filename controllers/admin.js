const mongodb = require("mongodb");
const Product = require("../models/product");

const postAddProduct = function (req, res) {
  // console.log("inside admin controller");
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const userId = req.user;

  const product = new Product({ title, description, price, imageUrl, userId });

  product
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = async function (req, res) {
  // console.log("inside admin controller");
  const prodId = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  await Product.updateOne(
    { _id: prodId },
    { title, description, price, imageUrl },
  );

  res.status(200).json({ message: "Product details updated" });

  // const product = new Product(
  //   title,
  //   description,
  //   price,
  //   imageUrl,
  //   prodId,
  // );

  // product
  //   .save()
  //   .then((result) => {
  //     res.json({ data: result });
  //   })
  //   .catch((err) => console.log(err));
};

const postDeleteProduct = async function (req, res, next) {
  const prodId = req.body.id;
  try {
    await Product.findByIdAndDelete(prodId);
    return res.json({ message: "Product deleted" });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
};
