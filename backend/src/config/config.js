require("dotenv").config();


const config = {


NODE_ENV: process.env.NODE_ENV || "development",


PORT: process.env.PORT || 3000,

/** MONGODB  */
MONGO_URI:process.env.MONGO_URI,

/** BCRYPTJS */
BCRYPT_SALT_ROUNDS:process.env.BCRYPT_SALT_ROUNDS || 10,

/** JWT SECRET */
JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,



/** IMAGEKIT */
IMAGEKIT_PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,

}



module.exports = config