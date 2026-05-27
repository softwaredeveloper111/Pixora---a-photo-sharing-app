const config   = require("./src/config/config");
const app = require("./src/app");
const connectToDB = require('./src/config/db')


const PORT = config["PORT"];
connectToDB()




app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} : http://localhost:${PORT}✅`);
})