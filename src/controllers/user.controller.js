import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadonCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req,res) => {
   // get user details from frontend
   // validation - not empty
   // check if user already exists: username , email
   // check for images, check for avatar
   // upload them ton cloudinary, avatar
   // create user obect - create entry in db
   // remove password and refersh token field from response
   // check for user creation
   // return res
   
   const {fullName , username , email , password} = req.body

   console.log("Email: ",email)

   if([username , fullName , email , password].some((field)=> field?.trim === "")){
      throw new ApiError(400, "All fields are required")
   }
   const existedUser = User.findOne({
      $or: [{ username },{ email }]
   })

   if(existedUser){
      throw new ApiError(409,"User with username or email already exists")
   }

   const avatarLocalPath = req.files?.avatar[0]?.path;
   const coverIamgeLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required")
   }

   const avatar = await uploadonCloudinary(avatarLocalPath)
   const coverImage = await uploadonCloudinary(coverIamgeLocalPath)

   if(!avatar){
      throw new ApiError(400,"Avatar file is required")
   }

   const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   )

   if(!createdUser){
      throw new ApiError(500,"Something went wrong while regestering the user")
   }

   return res.status(201).json(
      new ApiResponse(200 , createdUser , "User Created Successfully")
   )

} )

export { registerUser }