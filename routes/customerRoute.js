const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

router.post("/register", customerController.registerCustomer);
router.post("/login", customerController.loginCustomer);
router.patch("/update", customerController.updateCustomer);

module.exports = router;
