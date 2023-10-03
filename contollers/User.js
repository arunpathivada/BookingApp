import User from "../models/User.js";
export const UpdateUser = async(req,res,next)=>{
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedUser);
    }
    catch(err){
        next(err);
    }
}
export const DeleteUser = async(req,res,next)=>{
    try{
        const deletedUser=await User.findByIdAndDelete(req.params.id,{new:true});
        if(!deletedUser){
            res.status(404).json("User not found");
        }
        res.status(200).json("User deleted successfully")
    }
    catch(err){
        next(err);
    }
}

export const GetUser = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
        next(err);
    }
}

export const GetAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}





