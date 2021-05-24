const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/create", productController.createProduct);
router.patch("/edit", productController.updateProduct);
router.delete("/delete", productController.deleteProduct);

module.exports = router;
