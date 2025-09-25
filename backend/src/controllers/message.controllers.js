import express from "express";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.utils.js";
import { getRecieverSocketId } from "../utils/socket.js";

export const getUsersforSideBar = async( req , res )=>{
    
    try {
          const loggedInUserId = req.user._id;
    // this is the one whos texting
    const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
    res.status(200).json(filteredUsers)

    } catch (error) {
        console.error("this is a error in controller " , error.message)
        res.status(500).json({message:"Internal server error"})
    }
  
} 

export const getMessages = async( req,res )=>{
    try {
        const {id:userToChat_WithId} = req.params
        // so here we are unwrapping the url which has been requested and the url is then decoding the parameters and then these params are later used and also renamed to userToChat_WithId
        const myId = req.user._id
        // the user which is chatting with other users

        const messages = await Message.find({
            $or : [
            {
                senderId : myId , recieverId:userToChat_WithId
            } , 
            {
                senderId : userToChat_WithId , 
                recieverId:myId
            }]
        })
        res.status(200).json(messages)    
    }
     catch (error) {
        console.error("There is a error in getmessages function in message controllers " , error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessages = async ( req , res )=>{
    try {
        const {text , image} = req.body
        const {id:recieverId} = req.params
        const myId = req.user._id
        let imageUrl ; 
        if(image){
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }
        const newMessage = new Message({
                senderId,
                recieverId,
                text,
                image:imageUrl
        })
        await newMessage.save()

        const recieverSocketId = getRecieverSocketId(recieverId)

        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage" , newMessage)
        }
    
        res.status(201).json(newMessage)
    } 
    catch (error) {
        console.error("There is a error in send function in message controllers " , error.message)
        res.status(500).json({message:"Internal server error"})
    }
} 