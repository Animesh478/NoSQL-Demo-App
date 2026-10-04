const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  description: {
    type: "String",
    required: true,
  },
  imageUrl: {
    type: "String",
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const { dbConnect } = require("../utils/database");

// class Product {
//   constructor(title, description, price, imageUrl, id) {
//     this.title = title;
//     this.description = description;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this._id = id;
//   }

//   save() {
//     const db = dbConnect();
//     let dbOp;
//     if (this._id) {
//       // update the product
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((result) => {
//         return result;
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchAllProducts() {
//     const db = dbConnect();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((err) => console.log(err));
//   }

//   static fetchProduct(id) {
//     const db = dbConnect();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(id) })
//       .next()
//       .then((product) => {
//         console.log(product);
//         return product;
//       })
//       .catch();
//   }

//   static deleteProduct(id) {
//     const db = dbConnect();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then((result) => console.log("Deleted"))
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
