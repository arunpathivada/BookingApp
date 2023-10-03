import { createError } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken= (req,res,next)=>{
    const token = req.cookies.access_token;
    
    if(!token) return next(createError(401,"you don't have any authentication token"));
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(404,"Authentication token not matched"));
        req.user=user;
        next();
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(404, "You are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(404, "You are not Admin not allowed to delete accounts "));
        }
    });
};
