module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["PENDING", "PAID", "DONE"],
    },
  });

  Order.associate = (models) => {
    Order.hasMany(models.ProductOrder, {
      foreignKey: {
        name: "Order_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Order.associate = (models) => {
      Order.belongsTo(models.Customer, {
        foreignKey: {
          name: "Customer_id",
          allowNull: false,
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    };
  };
  return Order;
};
