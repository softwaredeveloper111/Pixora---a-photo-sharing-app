const  Redis = require("ioredis");
const config = require("../config/config")

const redis = new Redis({
  host: config.REDIS_HOST,
  port: config.REDIS_PORT,
  password: config.REDIS_PASSWORD
});



redis.on("connect",()=>{
  console.log("connected to redis successfully✅");
})


redis.on("error",(err)=>{
  console.log("error in connecting to redis❌",err.message);
})



module.exports = redis