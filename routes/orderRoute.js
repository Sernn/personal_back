const express = require("express");
const { protect } = require("../controllers/customerController");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", protect, orderController.getOrder);
router.post("/", protect, orderController.createOrder);
router.put("/", protect, orderController.updateOrder);
router.patch("/:orderId", protect, orderController.deleteOrder);

module.exports = router;
