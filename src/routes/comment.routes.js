import { Router } from "express";
import { addComment , updateComment , deleteComment , getVideoComments  } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.use(verifyJWT)//Apply verifyJWT to all routes in this file becuase user needs to be loggedIn to perform any action related to comments

router.route("/:videoId").get(getVideoComments).post(addComment);
router.route("/c/:commentId").delete(deleteComment).patch(updateComment);


export default router

