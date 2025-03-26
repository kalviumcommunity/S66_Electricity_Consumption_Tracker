require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Not Connected";
  res.json({
    message: "Welcome to Electricity Consumption Tracker",
    database: dbStatus,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
