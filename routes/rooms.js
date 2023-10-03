import express from "express";
const router = express.Router();
import { CreateRoom,DeleteRoom, GetAllRooms, GetRoom, UpdateRoom } from "../contollers/Room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
//create
router.post("/:hotelId",verifyAdmin,CreateRoom);

//update 
router.put("/:id",verifyAdmin,UpdateRoom);

//delete
router.delete("/:id/:hotelId",verifyAdmin,DeleteRoom);
//get
router.get("/:id",GetRoom)
//get all
router.get("/",GetAllRooms)

export default router;