import express from 'express';
import Room from '../models/Room.js';
import {  countByCity, countByType, createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, uploadphoto } from '../controllers/room.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import multer from 'multer';
const upload=multer({dest:'uploads/'});
const router =express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });


//CREATE
router.post("/",upload.array('photos',6),createRoom);
//UPDATE
router.put("/:id",verifyAdmin,updateRoom);
//DELETE
router.delete("/:id",verifyAdmin,deleteRoom);
//GET
router.get("/find/:id",getRoom);
//GET ALL
router.get("/",getAllRooms);

router.get("/countByCity",countByCity);
router.get("/countByType", countByType);

router.get("/:id",uploadphoto);

export default router;