import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";


const app = express();
app.use(cors());
dotenv.config();
//mongodb connection
const connect =async ()=>{
    try{
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB");
    }
    catch(error){
        throw error;
    }
}
app.use(express.json());
app.use(cookieParser());
app.use("/auth",authRoute);
app.use("/hotels",hotelsRoute);
app.use("/rooms",roomsRoute);
app.use("/users",usersRoute);

app.use((err,req,res,next)=>{
    const errStatus= err.status||500;
    const errMessage=err.message||"hotel not found";
    res.status(errStatus).json({
        success:false,
        status:errStatus,
        message:errMessage,
        stack:err.stack
    });
})











app.use(express.json());
connect();
app.listen(3000,()=>{
    console.log("server started on port 3000");
});
