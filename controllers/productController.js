const { Product } = require("../models");

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "desc"]],
      //   attributes: ["id", "text", "createdAt", "updatedAt"],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).json({ message: "Cannot find this product id" });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};
