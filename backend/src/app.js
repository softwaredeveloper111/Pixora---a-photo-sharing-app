const express = require("express");
const cookieParser = require("cookie-parser")
const authRouter = require("./routes/auth.route")
const errorHandler = require("./middlewares/errorHandler")


const app = express();


/** application middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




/** application routes */
app.use("/api/auth", authRouter);



/** healthcheck router */
app.get("/health" , (req , res) => {
    res.status(200).json({status:"ok"})
});



/** error handler */
app.use(errorHandler);



module.exports = app;