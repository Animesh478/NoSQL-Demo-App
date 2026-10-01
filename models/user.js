const mongodb = require("mongodb");
const { dbConnect } = require("../utils/database");

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = dbConnect();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    // product = {}
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      //   console.log("cp.productId", cp.productId);
      //   console.log("product._id", product._id);
      return cp.productId.equals(product._id);
    });

    console.log("cartProductIndex=", cartProductIndex);

    const updatedCartItems = [...this.cart.items];
    // let updatedQuantity = 1;

    if (cartProductIndex >= 0) {
      updatedCartItems[cartProductIndex].quantity += 1;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: 1,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = dbConnect();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } },
      );
  }

  static findUser(id) {
    const db = dbConnect();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.log(err));
  }
}

module.exports = User;
