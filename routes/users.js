import express from "express";
import { DeleteUser, GetAllUsers, GetUser, UpdateUser} from "../contollers/User.js";
const router = express.Router();
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";


router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hey bro you logged in");
});

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("you are verified user");
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hi admin you are allowed to delete all accounts");
})

//update
router.put("/:id",verifyUser,UpdateUser);

//delete
router.delete("/:id",verifyUser,DeleteUser);
//get
router.get("/find/:id",verifyUser,GetUser);
//get all
router.get("/",verifyAdmin,GetAllUsers);



export default router;