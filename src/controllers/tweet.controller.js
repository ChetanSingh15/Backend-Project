import mongoose, {isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";

const createTweet = asyncHandler(async (req,res) => {
    // TODO: create tweet
    const {content} = req.body
    
    if(!content){
        throw new ApiError(400,"Content is required");
    }

    const tweet = await Tweet.create({
        content: content,
        owner: req.user?._id
    })
    
    if(!tweet){
        throw new ApiError(500,"Something wrong while happened uplaoding tweet")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,"Tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req,res) => {
    // TODO: get user tweets
})

const updateTweet = asyncHandler(async (req,res) => {
    // TODO: update user tweet
    const {content} = req.body
    const {tweetId} = req.params
 
    if(!content){
        throw new ApiError(400,"Content is required")
    }

    if(!tweetId){
        throw new ApiError(404,"Tweet not found")
    }

    const tweetForCheckingUser = await Tweet.findById(tweetId)

    if(tweetForCheckingUser?.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(401,"Only owner can update the tweet")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: content
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200,tweet,'Tweet updated successfully'))


})

const deleteTweet = asyncHandler(async (req,res) => {
    // TODO: delete user tweet
})

export{
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet    
}