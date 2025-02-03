import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js"
import mongoose, {isValidObjectId} from "mongoose";

const toggleVideoLike = asyncHandler (async (req,res) => {
    const {videoId} = req.params
    // TODO: toggle like on a video
})

export{
    toggleVideoLike
}