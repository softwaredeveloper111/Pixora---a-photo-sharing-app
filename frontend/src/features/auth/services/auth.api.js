import axios from "../../../axios";
import {ApiError} from "../../shared/AppError";






/**
 * @description  register a new user
 * @route       http://localhost:3000/api/auth/register
 * @method       POST 
 * 
 * @params     {String} username
 * @params     {String} email
 * @param      {string} password
 * 
 * 
 * @returns   {Object} 400 validation error
 * @returns   {Object} 201 user registered successfully
 * @returns   {Object} 409 user alreay exists , conflict
 * 
 * @throws    {Object} 500 internal server error
 */

export async function registerUserAPI(data){
  try {


    const response = await axios.post("/api/auth/register",data)
    if(response.data?.success===false){
       throw new ApiError(
        response.data.message || "Failed to register user",
        response.data.statusCode || 400
      ); 
    }

   return response.data


  } catch (error) {

     if (error instanceof ApiError) throw error;

     if(error.response){
      throw new ApiError(
        error.response.data?.message || "Server error occurred",
        error.response.status
      );
   
    }


     if(error.request){
          throw new ApiError("Network error: Server not reachable", 503);
    }

      throw new ApiError("Something went wrong", 500);
     
  }
}





/**
 * @description   login a user
 * @route        http://localhost:3000/api/auth/login
 * @method        POST
 * 
 * @param         {String} identifiers
 * @param        {String} password
 * 
 * @returns       {Object} 200 user loggedin successfully
 * @returns       {Object} 401 invalid credentials
 * @returns       {Object} 400 validation error
 * 
 * @return        {Object} 500 internal server error
 *  
 */

export async function loginUserAPI(data){
  try {

    const response = await axios.post("/api/auth/login",data)
     
    if(response.data?.success===false){
       throw new ApiError(
        response.data.message || "Failed to register user",
        response.data.statusCode || 400
      ); 
    }

    return response.data
   
    
  } catch (error) {

    if (error instanceof ApiError) throw error;

     if(error.response){
      throw new ApiError(
        error.response.data?.message || "Server error occurred",
        error.response.status
      );
    }


     if(error.request){
          throw new ApiError("Network error: Server not reachable", 503);
     }

    throw new ApiError("Something went wrong", 500);
     
  
  }
}


