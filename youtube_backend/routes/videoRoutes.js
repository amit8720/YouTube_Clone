import express from "express";
import { addVideo, categoryVideo, disLikeVideo, getAllVideos, getSingleChannelVideos, getSingleVideo, likeVideo, searchVideo } from "../controllers/videoController.js"
import checkAuth from "../middlewares/checkAuth.js";

// added router for video routes

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getSingleVideo);

router.get("/search/:searchVideo", searchVideo);

router.get("/category/:categoryType", categoryVideo);

router.get("/channelVideos/:id", getSingleChannelVideos);

router.post("/addVideo", checkAuth, addVideo);

router.put("/likeVideo/:id/", checkAuth, likeVideo);

router.put("/disLikeVideo/:id/", checkAuth, disLikeVideo);


export default router;