import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";



import { connectDB } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true // allow frontend to send cookies
}
));
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
/*when we visit our application, we'll be able to serve both our api and our react application, so whenever we hit the above api endpoints (auth, users,chat), we're gonna
we're going to return the related functions (authRoutes, userRoutes, chatRoutes), but if we hit any other routes, we'll serve our react application, which is coming from the index.html file  */
//if in the production/deployed environment, take the dist folder from the front end, convert it to our static assests
if(process.env.NODE_ENV === "production"){
    //from the current backend directory, go into the front end and into the dist folder
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    //any routes other than auth, users, chat should return our react application
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});