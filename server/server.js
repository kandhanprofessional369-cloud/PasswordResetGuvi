const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Password Reset API is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});