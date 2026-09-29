const { dbConnect } = require("../utils/database");

class Product {
  constructor(title, description, price, imageUrl) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = dbConnect();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        // console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  static fetchAllProducts() {
    const db = dbConnect();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
