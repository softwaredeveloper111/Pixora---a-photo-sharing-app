import axios from "axios";
import ApiError from "./features/shared/ApiError"


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    withCredentials: true,
    timeout:10000
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    
     if (error.code === "ECONNABORTED") {
      throw new ApiError("Request timed out. Please try again.", 408);
    }


    if (error.response) {
      throw new ApiError(
        error.response.data?.message || "Server error occurred",
        error.response.status
      );
    }


    if (error.request) {
      throw new ApiError("Network error: Server not reachable", 503);
    }

    
    throw new ApiError("Something went wrong", 500);
  }
);



export default axiosInstance