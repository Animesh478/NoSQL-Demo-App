const express = require("express");
require("dotenv").config();
const { mongoConnect } = require("./utils/database");
const adminRouter = require("./routes/admin.routes");

const app = express();

app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("hello from server");
});

mongoConnect(() => {
  app.listen(3000);
  //   console.log(client);
});
