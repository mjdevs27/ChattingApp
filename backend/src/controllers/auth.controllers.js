import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils.js";
import cloudinary from "../utils/cloudinary.utils.js";

export const signup = async (req , res)=>
{
    const { email , fullName , password } = req.body;

    try {
        if(password.length<8){

        return res.status(400).json({message:"Password must be longer than 8 characters"})
        
    }


        const existinguser = await User.findOne({ email }) 

        if (existinguser) 
        {
            return res.status(400).json({message:"Email is already registered"})
        }

        if(!fullName || !email || !password){
            return res.status(400).json({message:"All feilds are required"})
        }


        const hashedPassword = await bcrypt.hash(password , 10)
        
        
        const newUser = new User({
            email,
            fullName,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id , res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                email:newUser.email
            })
        }
        else{
           return res.status(400).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.log("error in signup controller" , error.message)
        return res.status(500).json({message:"Internal Server error"})
    
    }
}


export const logout = (req , res)=>
{
    
    try {
        res.cookie("jwt" , "" , {maxAge:0})
        res.status(201).json({message:"you are sucessfully logged out"})
    } catch (error) {
        
    }
}


export const login = async(req , res)=>
{
    try {
    const {email , password} = req.body

    const existsUser = await User.findOne({ email })

    if(!existsUser)
    {
        return res.status(400).json({message : "Invalid Credentials"})
    }

    const ValidatePassword = await bcrypt.compare(password , existsUser.password)
    if(!ValidatePassword){
        return res.status(400).json({message : "Invalid Credentials"})
    }

    generateToken(existsUser._id , res)

    res.status(201).json({
        _id:existsUser._id,
        fullName:existsUser.fullName,
        email:existsUser.email
        })
    
    }
    catch (error) {
        console.log("Error in login method" , error.message)
        return res.status(500).json({message:"Internal Sever Error"})
    }
}

export const updateProfile = async(req , res)=>{
    
    try {
        const {profilePic} = req.body
    const userId = req.user._id

    if(!profilePic){
        return res.status(400).json({message : "Profile picture not provided"})    
    }
    const uploadresponse = cloudinary.uploader.upload(profilePic)
    // response uploaded on cloudinary and response recieved as a object

    const updateUser =  await User.findByIdAndUpdate(userId, {profPic : await uploadresponse.secure_url} , {new:true})
    } catch (error) {
        console.log("error found in updatePorfile" , error.message)
        res.status(500).json({message:"Internal server error"})
    }
    
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};