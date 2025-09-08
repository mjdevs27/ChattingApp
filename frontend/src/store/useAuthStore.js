import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create(()=>({
    authUser : null ,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            
        } catch (error) {
            console.log(error , "error in useAuthStore")
        }
    }
}))