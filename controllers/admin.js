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

module.exports = {
  postAddProduct,
};
