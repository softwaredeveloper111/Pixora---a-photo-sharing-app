import axiosInstance from "../../../axios";


/**
 * @description  register a new user
 * @route       https://pixora-photo-sharing-app.onrender.com/api/auth/register
 * @method       POST 
 * 
 * @params     {String} fullname
 * @params     {String} username
 * @params     {String} email
 * @params     {string} password
 * 
 * 
 * @returns   {Object} 400 validation error
 * @returns   {Object} 201 user registered successfully
 * @returns   {Object} 409 user alreay exists , conflict
 * 
 * @throws    {Object} 500 internal server error
 */

export async function registerUserAPI(data){
  const res = await axiosInstance.post("/api/auth/register",data);
  return res.data
}



/**
 * @description   login a user
 * @route         https://pixora-photo-sharing-app.onrender.com/api/auth/login
 * @method        POST
 * 
 * @param         {String} identifiers
 * @param         {String} password
 * 
 * @returns       {Object} 200 user loggedin successfully
 * @returns       {Object} 401 invalid credentials
 * @returns       {Object} 400 validation error
 * 
 * @return        {Object} 500 internal server error
 *  
 */

export async function loginUserAPI(data){
  const res = await axiosInstance.post("/api/auth/login",data)
  return res.data
}


/**
 * @description   get user profile
 * @route         https://pixora-photo-sharing-app.onrender.com/api/auth/me
 * @method        GET
 * 
 * @returns       {Object} 200 successfully get user profile
 * @returns       {Object} 401 unthorized access
 * 
 * @return        {Object} 500 internal server error 
 */

export async function getMeUserProfileAPI(){
  const res = await axiosInstance.get("/api/auth/me");
  return res.data
}




/**
 * @description   logout user successfully
 * @route         https://pixora-photo-sharing-app.onrender.com/api/auth/logout
 * @method        GET
 * 
 * @returns       {Object} 200 successfully logout get user profile
 * @returns       {Object} 401 unthorized access
 * 
 * @return        {Object} 500 internal server error 
 */

export async function logoutUserAPI(){
  const res = await axiosInstance.post("/api/auth/logout");
  return res.data
}