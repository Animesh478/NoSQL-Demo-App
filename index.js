const express = require("express");
require("dotenv").config();

// const { mongoConnect } = require("./utils/database");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin.routes");
const shopRouter = require("./routes/shop.routes");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  User.findById("6ac1843e202b7bb260b6e03b")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRouter);
app.use("/shop", shopRouter);

// mongoConnect(() => {
//   app.listen(3000);
// });

mongoose
  .connect(process.env.URI)
  .then(() => {
    User.findById("6ac1843e202b7bb260b6e03b").then((user) => {
      if (!user) {
        const newUser = new User({
          name: "Max",
          email: "max@gmail.com",
          cart: { items: [] },
        });

        newUser.save();
      }
    });
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => console.log(err));
