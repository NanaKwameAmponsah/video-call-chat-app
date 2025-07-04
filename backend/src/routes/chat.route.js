import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

//one endpoint to generate a stream token, for stream to be able to authenticate users
router.get("/token", protectRoute, getStreamToken);


export default router;