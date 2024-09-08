import axios from "axios";
import { message, status } from "./snackbar";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

httpClient.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        message.value = error?.response?.data?.error_message;
        status.value = "error";
        return Promise.reject(error);
    }
)