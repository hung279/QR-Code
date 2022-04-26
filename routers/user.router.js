const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get("/", userController.getHome);
router.get("/scan", userController.getUsers);
router.post("/", userController.createQrUser);
router.post("/scan", userController.readQRCode);

module.exports = router;