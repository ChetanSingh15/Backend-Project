import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import {uploadonCloudinary} from "../utils/cloudinary.js"
import { User } from "../models/user.model.js";

const getAllVideos = asyncHandler(async (req,res) => {
    const {page = 1 ,limit = 10, query , sortBy, sortType , userId } = req.query
    // TODO: get all videos based on query , sort , pagination
})

const publishAVideo = asyncHandler(async (req,res) => {
    const {title,description} = req.body;
    // TODO: get video, upload on cloudinary , create video
    if(!title || !description) {
        throw new ApiError(400,"Title and description are required")
    }

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

    // console.log(videoLocalPath);
    // console.log(thumbnailLocalPath);
    console.log(req.user)


    if(!videoLocalPath || !thumbnailLocalPath){
        throw new ApiError(400,"Video and thumbnail are required")
    }

    const videoFile = await uploadonCloudinary(videoLocalPath)
    const thumbnail = await uploadonCloudinary(thumbnailLocalPath)

    // console.log(req.user?._id)

    const video  = await Video.create({
        videoFile: videoFile.url,
        thumbnail: thumbnail.url,
        title,
        description,
        duration: videoFile?.duration,
        owner: req.user?._id
    })

    if(!video){
        throw new ApiError(500,"Failed to upload video, please try again")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Video uploaded successfully"))
})

const getVideoById = asyncHandler(async (req,res) => {
    const {videoId} = req.params
    // TODO: get video by id
    const video = await Video.findById(videoId)

    if(!video) {
        throw new ApiError(404,"Video not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Video fetched successfully"))
})

const updateVideo = asyncHandler( async (req,res) => {
    const {videoId} = req.params
    // TODO: update video details like title , description , thumbnail
    const { title , description } = req.body
    
    if(!title || !description) {
        throw new ApiError(400,"Title and description are required")
    }

    const thumbnailLocalPath = req.file?.path

    const thumbnail = await uploadonCloudinary(thumbnailLocalPath)

    // if(thumbnailLocalPath && !thumbnail.url){
    //     throw new ApiError(400,"Error while uploading thumbnail")
    // } // This can be used when you gave the user the flexibility to only change the title and description. The video need not be required to change the thumbnail

    if(!thumbnail.url) {
        throw new ApiError(400,"Error while uplaoding the thumbnail")
    }
    // console.log(thumbnail.url)

    const video = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title: title,
                description: description,
                thumbnail: thumbnail?.url
            }
        },
        {
            new:true
        }
    )

    return res
    .status(200)
    .json(new ApiResponse(200,video,"Video fields updated successfully"))
})

const deleteVideo  = asyncHandler(async (req , res) => {
    const {videoId} = req.params
    // TODO: delete video

    const video = await Video.findById(videoId)

    if(!video){
        throw new ApiError(400,"Video is required")
    }

    // console.log(req.user) // ***Not getting user in req.user, I will check it later*

    // console.log(video?.owner);
    // console.log(req.user?._id);

    // if(video?.owner !== req.user?._id){
    //     throw new ApiError(402,"Only video owner can delete the video")
    // } // *** Somehow I am not getting anything in req.user. I will check it later 

    await Video.findByIdAndDelete(videoId);

    Video.deleteMany({
        video: videoId,
        owner: req.user?._id
    })

    return res
    .status(200)
    .json(new ApiResponse(200,{video},"Video deleted successfully"))
})

const togglePublishStatus = asyncHandler(async (req,res) => {
    const {videoId} = req.params

    const video = await Video.findById(videoId);

    if(!video){
        throw new ApiError(404,"Video not found")
    }

    video.isPublished = !video.isPublished
    await video.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,video,"togglePublishStatus implemented successfully"))
})
 
export{
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
