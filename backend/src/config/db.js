const mongoose = require("mongoose");
const config = require("./config")


async function connectToDB(){
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("conneted to mongoDB database✅")
    } catch (error) {
        console.log(`connection failed with mongodb❌, ${error.message}`);
    }
}


module.exports = connectToDB;