import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './DB/connectDB.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';
import path from 'path';
// import rentalRoutes from './routes/rentalRoutes.js';



dotenv.config();
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

const PORT=process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from React app
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true, // Allow cookies, if needed
}));
app.use("/api/auth",authRoutes);
app.use("/api/product",productRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log('server is running on port '+PORT);
});
