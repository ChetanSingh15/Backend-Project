import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Video } from "../models/video.model.js";
import {uploadonCloudinary} from "../utils/cloudinary.js"

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


    if(!videoLocalPath || !thumbnailLocalPath){
        throw new ApiError(400,"Video and thumbnail are required")
    }

    const videoFile = await uploadonCloudinary(videoLocalPath)
    const thumbnail = await uploadonCloudinary(thumbnailLocalPath)

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

export{
    getAllVideos,
    publishAVideo
}
