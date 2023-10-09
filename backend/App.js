const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// import routes
const User = require("./controller/user");
const Shop = require("./controller/shop");
const Product = require("./controller/product");
const Event = require("./controller/event");
const Coupon = require("./controller/coupounCode");
const Payment = require("./controller/payment");
const Order = require("./controller/order");
const Message = require("./controller/message");
const Conversation = require("./controller/conversation");
const Withdraw = require("./controller/withdraw");

app.use("/api/v2/user", User);
app.use("/api/v2/shop", Shop);
app.use("/api/v2/product", Product);
app.use("/api/v2/event", Event);
app.use("/api/v2/coupon", Coupon);
app.use("/api/v2/payment", Payment);
app.use("/api/v2/order", Order);
app.use("/api/v2/message", Message);
app.use("/api/v2/conversation", Conversation);
app.use("/api/v2/withdraw", Withdraw);

//It's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
