const { Customer } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

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
    const user = await Customer.findOne({ where: { id: payload.id } });
    if (!user) return res.status(400).json({ message: "user not found" });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

exports.registerCustomer = async (req, res, next) => {
  try {
    const {
      userName,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      location,
    } = req.body;
    if (!userName || !userName.trim())
      return res.status(400).json({ message: "username is required" });
    if (!password || !password.trim())
      return res.status(400).json({ message: "password is required" });
    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ message: "password and confirm password must be the same" });
    if (!firstName || !firstName.trim())
      return res.status(400).json({ message: "firstname is required" });
    if (!lastName || !lastName.trim())
      return res.status(400).json({ message: "lastname is required" });
    if (!email || !email.trim())
      return res.status(400).json({ message: "email is require" });

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );
    const customer = await Customer.create({
      userName,
      password: hashedPassword,
      confirmPassword,
      firstName,
      lastName,
      email,
      location,
    });
    const payload = { id: customer.id, firstName, lastName };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.loginCustomer = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const customer = await Customer.findOne({ where: { userName } });
    if (!customer)
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "incorrect username or password" });
    const payload = {
      id: customer.id,
      userName: customer.userName,
      email: customer.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (res, req, next) => {
  try {
    const { firstName, lastName, email, location } = req.body;
    await Customer.update(
      { firstName, lastName, email, location },
      { where: { id: req.customer.id } }
    );
  } catch (err) {
    next(err);
  }
};

exports.getCustomerById = async (req, res, next) => {
  try {
    const {
      username,
      password,
      confirmPassword,
      firstName,
      lastName,
      email,
      location,
    } = req.body;
    res.status(200).json({
      user: {
        username,
        password,
        confirmPassword,
        firstName,
        lastName,
        email,
        location,
      },
    });
  } catch (err) {
    next(err);
  }
};
