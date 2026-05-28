const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const followRouter = require("./routes/follow.route")
const errorHandler = require("./middlewares/errorHandler.middleware")


const app = express();


/** application middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




/** application routes */
app.use("/api/auth", authRouter);
app.use("/api/follow" , followRouter)



/** healthcheck router */
app.get("/health" , (req , res) => {
    res.status(200).json({status:"ok"})
});



/** error handler */
app.use(errorHandler);



module.exports = app;