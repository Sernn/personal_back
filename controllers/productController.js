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

exports.createProduct = async (req, res, next) => {
  try {
    const { name, desc, price, quantity } = req.body;
    const product = await Product.create({
      name,
      desc,
      price,
      quantity,
      adminId: req.admin.id,
    });
    res.status(201).json({ message: `${product} create successfully` });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, desc, price, quantity } = req.body;
    await Product.update(
      { name, desc, price, quantity },
      { where: { id: req.product.id } }
    );
    res.status(200).json({ message: "update product successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ where: { id } });
    if (!product)
      return res.status400(400).json({ message: "product is not found" });
    await Product.destroy({ where: { id } });
    res.sattus(204).json({ message: "product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
