const express = require("express");
const app = express();
const axios = require("axios").default;
const pug = require("pug");
const userRouter = require("./routes/user");
const port = 3001;

// template engine
app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

// file static express
app.use(express.static("public"));

// routes
app.use(userRouter);

// server runnig
app.listen(port, () => {
  console.log(`Server aktif di port ${port}`);
});
