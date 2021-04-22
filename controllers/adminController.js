const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "you are unauthorized" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) return res.status(400).json({ message: "user not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      password,
      confirmPassword,
    } = req.body;
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "confirm password must be same with password" });
    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );

    const admin = await Admin.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
    });
    const payload = { id: admin.id, firstName, lastName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ where: { userName } });
    if (!admin)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const payload = {
      id: admin.id,
      firstName: admin.firstName,
      lastName: admin.lastName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ token });
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

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({ product });
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
