import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';


const upload=multer({dest:'uploads/'});

const app = express();
dotenv.config();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.Mongo);
        console.log("connected to mogodb");
      } catch (error) {
        throw error
    }
};

//middlewares
app.use(cors({
    origin:["http://localhost:8800","https://BTB_app.onrender.com"]
}));
app.use(cookieParser());
app.use(express.json());
app.use("/uploads",express.static("uploads"));


app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
app.use("/api/rooms",roomsRoute);


app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message:errorMessage,
        stack:err.stack
    });
});

app.listen(PORT,()=>{
    connect();
    console.log("connected to database");
});