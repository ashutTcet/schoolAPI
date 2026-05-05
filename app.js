const express = require('express');
const cors = require('cors');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/', schoolRoutes);

app.get('/', (req, res) => {
  res.send("School API is running...");
});

// Port (Render uses process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});