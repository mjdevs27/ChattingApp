import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create((set)=>({
    authUser : null ,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser : res.data})
        } catch (error) {
            set({authUser : null})
            console.log(error , "error in useAuthStore")
            // user is not authenticated. 
        }
        finally {
            set( {isCheckingAuth  : false } )
        }
    }
}))