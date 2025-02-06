import mongoose, {isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";

const toggleSubcription = asyncHandler(async (req,res) => {
    // TODO: toggle subscription
    const { channelID } = req.params
})

const getUserChannelSubscribers = asyncHandler(async (req,res) => {
    // TODO: controller to return subscriber list of a channel
    const {channelId} = req.params
})

const getSubscribedChannels = asyncHandler(async (req,res) => {
    // TODO : controller to return channel list to which user has subscribed 
    const { subscriberId } = req.params
})


export{
    toggleSubcription,
    getUserChannelSubscribers,
    getSubscribedChannels
}