module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  Product.associate = (models) => {
    Product.hasMany(models.AdminProduct, {
      foreignKey: {
        name: "Product_id",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Product.associate = (models) => {
      Product.hasMany(models.ProductOrder, {
        foreignKey: {
          name: "Product_id",
          allowNull: false,
        },
        OnDelete: "RESTRICT",
        onUpdate: "RESTRICT",
      });
    };
  };
  return Product;
};
