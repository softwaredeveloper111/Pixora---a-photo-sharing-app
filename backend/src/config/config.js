require("dotenv").config();


const config = {

/** system enviroment */
NODE_ENV: process.env.NODE_ENV || "development",

/** port */
PORT: process.env.PORT || 3000,


/** frontend url */
CLIENT_URL:process.env.CLIENT_URL || "http://localhost:5173",


/** MONGODB  */
MONGO_URI:process.env.MONGO_URI,

/** BCRYPTJS */
BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS || 10,

/** JWT SECRET */
JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,



/** IMAGEKIT */
IMAGEKIT_PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,


/** REDIS */
REDIS_HOST:process.env.REDIS_HOST,
REDIS_PORT:process.env.REDIS_PORT,
REDIS_PASSWORD:process.env.REDIS_PASSWORD,



}



module.exports = config