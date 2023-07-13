import express from "express";
import cors from "cors"

import userRoutes from "./routes/userRoutes";
import tweetRoutes from "./routes/tweetRoutes"
import authRoutes from "./routes/authRoutes"
import uploadRoutes from "./routes/uploadRoutes"
import { authenticationToken } from "./middlewares/authMiddleware";

const corsOptions = {
    origin :process.env.URL,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
}



const app = express()
app.use(express.json())
app.use(cors(corsOptions))

// to server image
app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use("/user", authenticationToken, userRoutes)
app.use("/tweet", authenticationToken, tweetRoutes)
app.use("/auth", authRoutes)
app.use("/upload", uploadRoutes);


app.get("/", (req, res) => {
    res.send("Hello World kumupta")
})



app.listen(3000, () => {
    console.log("server running on port:3000")
})