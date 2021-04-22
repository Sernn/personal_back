const { Order, ProductOrder, sequelize } = require("../models");

exports.getOrder = async (req, res, next) => {
  const orders = await Order.getAll();
  res.status(200).json({ message: "success", orders });
};

exports.createOrder = async (req, res, next) => {
  const { id } = req.user;
  const { amount, status, order } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const newOrder = await Order.create({
      status: "PENDING",
      Customer_id: id,
      amount,
    });

    const newArr = [...order];

    const payload = await Promise.all(
      newArr.map(async (item) => {
        return {
          Product_id: item.id,
          Order_id: newOrder.id,
          quantity: item.quantity,
        };
      })
    );

    const newProductOrder = await ProductOrder.bulkCreate(payload, {
      transaction,
    });
    await transaction.commit();
    res.status(200).json({ newOrder, newProductOrder });
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {};

exports.deleteOrder = async (req, res, next) => {};
