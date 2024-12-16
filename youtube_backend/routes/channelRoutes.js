import express from "express"
import { createChannel, getMyChannel, deleteChannel, getSpecificChannel } from "../controllers/channelController.js"
import checkAuth from "../middlewares/checkAuth.js";

// added router for channel routes

const router = express.Router();



router.post("/createChannel", checkAuth, createChannel);



router.get("/:id", getSpecificChannel);

router.get("/getMyChannel/:uid", getMyChannel);




router.delete("/deleteChannel/:id/:uId", checkAuth, deleteChannel);

export default router;