import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubcription } from "../controllers/subscription.controller.js";

const router = Router()
router.use(verifyJWT);

router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubcription);

router.route("/u/:subscriberId").get(getSubscribedChannels);

export default router