import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import  { Comment } from "../models/comment.model.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async(req,res) => {
    //TODO: get all comments for a video
    const {VideoId} = req.params
    const {page =1 , limit = 10} = req.query
})

const addComment = asyncHandler( async (req,res) => {
    // TODO: add a comment to a video
    const { videoId } = req.params
    const { content } = req.body;

    if(!content){
        throw new ApiError(401,"Comment is required")
    }

    const video = await Video.findById(videoId);

    if(!video) {
        throw new ApiError(404,"Video not found")
    }

    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user?._id
    })

    if(!comment) {
        throw new ApiError(500,"Failed to add comment")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,{comment},"Comment added successfully"))


})

const updateComment = asyncHandler( async (req,res) => {
    //TODO: update a comment 
    const {commentId} = req.params
    const {content} = req.body

    if(!content){
        throw new ApiError(400,"Comment content is required")
    }


    const comment = await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    if(comment?.owner.toString() !== req.user?._id){
        throw new ApiError(401,"Only comment owner can update the comment")
    }


    const updateComment = await Comment.findByIdAndUpdate(
        comment?._id,
        {
            $set: {
                content: content,
            }
        },
        {
            new:true
        }
    )

    if(!updateComment){
        throw new ApiError(500,"Failed to edit comment, please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,updateComment,"Comment Updated Successfully"))
})

const deleteComment = asyncHandler(async (req,res) => {
    //TODO: Delete a comment
    const commentId = req.params

    const comment = await Comment.findById(commentId);

    if(!comment){
        throw new ApiError(404,"Comment not found")
    }

    if(comment?.owner.toString() !== req.user?._id.toString()){
        throw new ApiError(400,"Only comment owner can delete the comment")
    }

    await Comment.findByIdAndDelete(commentId);

    await Like.deleteMany({
        comment: commentId,
        likedBy: req.user
    })

    return  res
    .status(200)
    .json(new ApiResponse(200,{comment},"Comment Deleted Successfully"))

})

export {
    addComment,
    updateComment,
    deleteComment,
    getVideoComments
}