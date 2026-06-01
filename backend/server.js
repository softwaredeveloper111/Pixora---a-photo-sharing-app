const config   = require("./src/config/config");
const app = require("./src/app");
const connectToDB = require('./src/config/db');
const {createServer} = require("http")
const {initSocket} = require("./src/socket/socket")


const PORT = config["PORT"];
const server = createServer(app);
initSocket(server)
connectToDB()





server.listen(PORT,()=>{
    console.log(`server running on port ${PORT} : http://localhost:${PORT}✅`);
})