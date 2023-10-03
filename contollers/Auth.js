import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
export const register= async (req,res,next)=>{
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            isAdmin:req.body.isAdmin
        });
        newUser.save();
        res.status(200).json(newUser);
    }
    catch(err){
        next(err);

    }
} 

export const login= async (req,res,next)=>{
    try{
    const user = await User.findOne({username:req.body.username});
    if(!user) return next(createError(404,"user not found"));
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect){
        return next(createError(400,"password is incorrect"));
    }
    const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
    res.cookie("access_token",token,{httpOnly:true}).status(200).json({username:user.username,email:user.email});
    }
    catch(err){
        next(err);
    }
} 

