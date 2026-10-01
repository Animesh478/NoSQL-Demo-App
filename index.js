const express = require("express");
require("dotenv").config();

const { mongoConnect } = require("./utils/database");
const adminRouter = require("./routes/admin.routes");
const shopRouter = require("./routes/shop.routes");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  User.findUser("6abe81a66f5a978533afafd1")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);
app.get("/", (req, res) => {
  res.send("hello from server");
});

mongoConnect(() => {
  app.listen(3000);
  //   console.log(client);
});
