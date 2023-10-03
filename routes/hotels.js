import express from "express";


import { createError } from "../utils/error.js";
import { CreateHotel, DeleteHotel, GetAllHotels, GetHotel, UpdateHotel,countBycity,countBytype  } from "../contollers/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//create
router.post("/",verifyAdmin,CreateHotel);

//update 
router.put("/:id",verifyAdmin,UpdateHotel);

//delete
router.delete("/:id",verifyAdmin,DeleteHotel);
//get
router.get("/:id",GetHotel)
//get all
router.get("/",GetAllHotels)



router.get("/countBycity",countBycity);
router.get("/countBytype",countBytype);

export default router;