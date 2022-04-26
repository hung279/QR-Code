const User = require("../models/user.model");
const asyncHandle = require("../utils/asyncHandle");
const qrcode = require("qrcode");
const QRReader = require('qrcode-reader');
const jimp = require('jimp');
let user;
module.exports = {
  getHome: asyncHandle(async (req, res, next) => {
    if (!user) {
      return res.render("index", {
        qr_code: "",
      });
    }
    qrcode.toDataURL(user, (err, code) => {
      if (err) {
        return console.log("error occurred");
      }
      res.render("index", {
        qr_code: code,
      });
    });
  }),

  createQrUser: asyncHandle(async (req, res, next) => {
    user = JSON.stringify(req.body);
    console.log(user);
    qrcode.toString(user, { type: "terminal" }, (err, code) => {
      if (err) {
        return console.log("error occurred");
      }
      console.log(code);
    });
    res.redirect("/");
  }),

  readQRCode: asyncHandle(async (req, res, next) => {
    console.log(req.files.file);
    
    jimp.read(req.files.file.data, function (err, image) {
      if (err) {
        console.error(err);
      }
      // Creating an instance of qrcode-reader module
      let qrreader = new QRReader();
      qrreader.callback = async function (err, value) {
        if (err) {
          console.error(err);
        }
        // Printing the decrypted value
        console.log(value.result);
        const user = await User.create(JSON.parse(value.result));
        console.log(user);
      };
      // Decoding the QR code
      qrreader.decode(image.bitmap);
      
    });
    //console.log(user);
    res.redirect("/scan");
  }),

  getUsers: asyncHandle(async (req, res, next) => {
    const users = await User.find();
    
    res.render("scan", {users: users});
  })
};
