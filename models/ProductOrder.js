module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("ProductOrder", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  model.associate = (models) => {
    model.belongsTo(models.Product, {
      foreignKey: {
        name: "Product_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
    model.associate = (models) => {
      model.belongsTo(models.Order, {
        foreignKey: {
          name: "Order_id",
          allowNull: false,
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    };
  };

  return model;
};
