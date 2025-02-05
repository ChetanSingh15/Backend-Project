import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Like } from "../models/like.model.js"
import {Video} from "../models/video.model.js"
import mongoose, {isValidObjectId} from "mongoose";

const toggleVideoLike = asyncHandler (async (req,res) => {
    const {videoId} = req.params
    // TODO: toggle like on a video

    if(!videoId){
        throw new ApiError(400,"Video Information is required")
    }

    const userId = req.user?._id;

    const existingLikeOnVideo = await Like.findOneAndDelete({
        video: videoId, 
        likedBy: userId
    })

    if(existingLikeOnVideo){
        return res
        .status(200)
        .json(new ApiResponse(200,"Like removed from video successfully"))
    }

    const newLike = await Like.create({
        video: videoId, 
        likedBy: userId
    });

    if(!newLike){
        throw new ApiError(500,"Unable to like video")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Like added successfully"))  

})

const toggleCommentLike = asyncHandler(async (req,res) => {
    const { commentId } = req.params
    // TODO : toggle like on comment

    if(!commentId){
        throw new ApiError(400,"Comment is required")
    }

    const userId = req.user?._id;

    const existingLikeOnComment = await Like.findOneAndDelete({
        comment: commentId, 
        likedBy: userId
    })

    if(existingLikeOnComment){
        return res
        .status(200)
        .json(new ApiResponse(200,"Like removed from comment successfully"))
    }

    const newLike = await Like.create({
        comment: commentId, 
        likedBy: userId
    })

    if(!newLike){
        throw new ApiError(500,"Unable to like comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Like added on comment successfully"))
})

const toggleTweetLike = asyncHandler(async (req,res) => {
    const { tweetId } = req.params

    if(!tweetId) {
        throw new ApiError(400,"Tweet required")
    }

    const userId = req.user?._id;

    const existingLikeOnTweet = await Like.findOneAndDelete({
        tweet: tweetId,
        likedBy: userId
    })

    if(existingLikeOnTweet){
        return res
        .status(200)
        .json(new ApiResponse(200,"Like on tweet removed successfully"))
    }

    const newLike = await Like.create({
        tweet: tweetId,
        likedBy: userId
    })

    if(!newLike) {
        throw new ApiError(500,"Unable to like tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,"Like added on tweet successfully"))
})

const getLikedVideos = asyncHandler(async (req,res) => {
    const { videoId } = req.params;
    // TODO: get all liked videos
})

export{
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
}