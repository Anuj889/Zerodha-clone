require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Models
const HoldingsModel = require("./model/HoldingsModel");
const PositionsModel = require("./model/PositionsModel");
const OrdersModel = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");

// Routes
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// ---------------- Middleware ----------------
app.use(cors({
  origin: "http://localhost:3000", // FRONTEND_URL set in Render environment variables
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---------------- Routes ----------------

// Root route
app.get("/", (req, res) => res.send("Backend is running!"));

// Auth routes
app.use("/auth", authRoute);

// Test route to ensure server is running
app.get("/test", (req, res) => res.send("Server works"));

// Get all holdings
app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all positions
app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add new order
app.post("/newOrder", async (req, res) => {
  try {
    const newOrder = new OrdersModel(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ---------------- Connect DB and start server ----------------
mongoose.connect(uri)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log("App started on port", PORT));
  })
  .catch(err => console.error("DB connection error:", err));
