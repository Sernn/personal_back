require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRoute");
const productRoute = require("./routes/productRoute");
const customerRoute = require("./routes/customerRoute");
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoute);
app.use("/product", productRoute);
app.use("/customer", customerRoute);
app.use("/order", orderRoute);

app.use((req, res) => {
  res.status(404).json({ message: "path not found on this server" });
});

app.use(errorMiddleware);

sequelize.sync({ force: false }).then(() => console.log("DB Sync"));

const port = process.env.PORT || 2000;
app.listen(port, () => console.log(`server running on port ${port}`));
