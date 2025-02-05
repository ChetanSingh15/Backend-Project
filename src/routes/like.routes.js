import { Router } from "express";
import { 
    toggleVideoLike, 
    toggleCommentLike, 
    toggleTweetLike, 
    getLikedVideos 
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT) // apply verifyJWT to all routes in this file so that only loggedIN user can like a video

router.route("/toggle/v/:videoId").post(toggleVideoLike);
router.route("/toggle/c/:commentId").post(toggleCommentLike);
router.route("/toggle/t/:tweetId").post(toggleTweetLike);
router.route("/videos").get(getLikedVideos);


export default router;