const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const cors=require("cors")
require('dotenv').config({path:'./.env'});
app.use(cookieParser());

app.use(express.json());

app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

require('./connection');

const userRoutes = require('./Routes/user');
const facilityRoutes = require('./Routes/facility');
const medicineRoutes = require('./Routes/medicine')
const hopitalRoutes = require('./Routes/nearByHospital')
const notificationRoutes = require('./Routes/notification');
const gallaryRoutes = require('./Routes/gallery');
const historyRoutes = require('./Routes/history')


app.use('/api/auth',userRoutes);
app.use('/api/facility',facilityRoutes);
app.use("/api/medicine",medicineRoutes)
app.use("/api/hospital",hopitalRoutes)
app.use('/api/notification',notificationRoutes)
app.use('/api/gallary',gallaryRoutes)
app.use('/api/history',historyRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Successfully running on port ${process.env.PORT}`);
});

// swayampriyadarsi_db_user
// UfogZ8QqyFo60aoQ
// mongodb+srv://swayampriyadarsi_db_user:<db_password>@cluster0.djtvkoz.mongodb.net/?appName=Cluster0