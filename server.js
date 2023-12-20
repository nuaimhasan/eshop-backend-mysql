const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static("upload"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));

// routers

const userRoutes = require("./routes/userRoutes.js");

const logoRouter = require("./routes/logoRoutes.js");
const contactRouter = require("./routes/contactRoutes.js");
const bannerRouter = require("./routes/bannerRoutes.js");
const aboutRouter = require("./routes/aboutRoutes.js");

const productRouter = require("./routes/productRouter.js");
const categoryRouter = require("./routes/categoriesRoutes.js");
const colorRouter = require("./routes/colorRoutes.js");
const orderRouter = require("./routes/orderRoutes.js");

app.use("/user", userRoutes);
app.use("/logo", logoRouter);
app.use("/contact", contactRouter);
app.use("/banner", bannerRouter);
app.use("/about", aboutRouter);

app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/color", colorRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
