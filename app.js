const express = require("express");
const app = express();
const errorMiddleware = require("./middleWare/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

// Routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const food = require("./route/foodRoute");
const payment = require("./route/paymentRoute");
const invoice = require("./route/invoiceRoute");
const reservation = require("./route/bookingRoute");

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(fileUpload());
app.use(cors({
  //origin: '*', 
 origin: 'http://localhost:3000', 
 //origin: 'https://conserveriemenzah9.com',
 // // Allow requests from your frontend URL
  credentials: true,
}));
app.use(errorMiddleware);

// API Routes
app.use("/api/v1", product);
app.use("/api/v1", food);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", invoice);
app.use("/api/v1", reservation);

// Static files
const __dirname1 = path.resolve(__dirname, "..");


// Serve static files from the frontend's build folder
app.use(express.static(path.join(__dirname1, "front", "build")));

// Serve static files from the public folder for uploads or other assets
app.use("/public", express.static(path.join(__dirname1, "public")));

// Catch-all route to serve React frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "front", "build", "index.html"));
});

module.exports = app;
