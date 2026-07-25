const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config({ path: './.env' });

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173',
    'https://college-dispensary-management.onrender.com'
  ],
  })
);

// MongoDB Connection
require('./connection');

// Routes
const userRoutes = require('./Routes/user');
const facilityRoutes = require('./Routes/facility');
const medicineRoutes = require('./Routes/medicine');
const hospitalRoutes = require('./Routes/nearByHospital');
const notificationRoutes = require('./Routes/notification');
const galleryRoutes = require('./Routes/gallery');
const historyRoutes = require('./Routes/history');

app.use('/api/auth', userRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/history', historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Successfully running on port ${PORT}`);
});