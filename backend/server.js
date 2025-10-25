const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://todo-alb-374964371.eu-north-1.elb.amazonaws.com",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/todos", require("./routes/todoRoutes"));

// Health check route for /api path
app.get("/api", (req, res) => {
  res.json({ message: "Todo API is running" });
});

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

const PORT = process.env.PORT || 5000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
