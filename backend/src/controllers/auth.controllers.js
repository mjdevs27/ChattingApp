import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils.js";


export const signup = async (req , res)=>
{
    const { email , fullName , password } = req.body;
    try {
        if(password.length<8){
        return res.status(400).json({message:"Password must be longer than 8 characters"})
        }
        const existinguser = await User.findOne({ email })     
        if (existinguser) 
        {res.status(400).json({message:"Email is already registered"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        const newUser = new User({
            fullName,
            email,
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
            res.status(400).json({message:"Invalid User Data"})
        }

    } catch (error) {
        console.log("error in signup controller" , error.message)
        res.status(500).json({message:"Internal Server error"})
    
    }
}


export const logout = (req , res)=>
{
    res.send("hello user you have logged out")
}


export const login = (req , res)=>
{
    res.send("hello user you have logged in")
}