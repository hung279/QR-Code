const express = require("express");
const app = express();
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');

const port = 3000;

mongoose
  .connect('mongodb://localhost:27017/qr-code')
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");


const userRouter = require("./routers/user.router");

app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
