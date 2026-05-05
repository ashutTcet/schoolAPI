const express = require('express');
const cors = require('cors');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // IMPORTANT (fixes req.body issue)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', schoolRoutes);

// Health check (optional but useful for deployment)
app.get('/', (req, res) => {
  res.send("🚀 School API is running...");
});

// Port (Render uses process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});