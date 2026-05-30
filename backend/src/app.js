const express = require("express");
const cookieParser = require("cookie-parser")

const authRouter = require("./routes/auth.route")
const followRouter = require("./routes/follow.route")
const postRouter = require("./routes/post.route")
const likeRouter = require("./routes/like.route")
const savedRouter = require("./routes/saved.route")


const errorHandler = require("./middlewares/errorHandler.middleware")


const app = express();


/** application middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




/** application routes */
app.use("/api/auth", authRouter);
app.use("/api/follow" , followRouter)
app.use("/api/posts", postRouter)
app.use("/api/posts/like", likeRouter)
app.use("/api/posts/saved",savedRouter)


/** healthcheck router */
app.get("/health" , (req , res) => {
    res.status(200).json({status:"ok"})
});



/** global error handler */
app.use(errorHandler);




module.exports = app;