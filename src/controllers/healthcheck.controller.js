import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const healthcheck = asyncHandler(async (req,res) => {
    // TODO: build a healthcheck response that simply returns the OK status as json with message
    return res
    .status(200)
    .json(new ApiResponse(200,{message: "Everything is working completely fine!!"},"OK"))
})

export{
    healthcheck
}