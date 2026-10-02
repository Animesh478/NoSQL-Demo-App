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
      return cp.productId.equals(product._id);
    });

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

  getCart() {
    const db = dbConnect();
    const productIds = this.cart.items.map((product) => product.productId);
    console.log("productIds=", productIds);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: this.cart.items.find(
              (item) => item.productId.equals(product._id).quantity,
            ),
          };
        });
      });
  }

  deleteCartItem(productId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    const db = dbConnect();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } },
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
