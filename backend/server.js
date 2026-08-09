require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Aristocrat 3D Backend API is running successfully!",
  });
});

// Mock Quotes API Endpoint
app.post("/api/quotes", (req, res) => {
  const quoteData = req.body;
  console.log("Received Quote Request:", quoteData);

  // Here we will later save to PostgreSQL and trigger email notification
  res.status(201).json({
    success: true,
    message: "Quote created successfully!",
    quoteId: Math.floor(100000 + Math.random() * 900000),
    estimatedPrice: 499 * (quoteData.quantity || 1),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Aristocrat 3D Server running on port ${PORT}`);
});
