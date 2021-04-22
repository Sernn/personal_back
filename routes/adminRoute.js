const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/product", adminController.login);
router.patch("/product", adminController.login);
router.delete("/product/:id", adminController.login);

module.exports = router;
