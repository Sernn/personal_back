module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define("AdminProduct");

  model.associate = (models) => {
    model.belongsTo(models.Admin, {
      foreignKey: {
        name: "Admin_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    model.associate = (models) => {
      model.belongsTo(models.Product, {
        foreignKey: {
          name: "Product_id",
          allowNull: "false",
        },
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    };
  };

  return model;
};
