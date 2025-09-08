import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:6601/api",
    withCredentials : true,
})
