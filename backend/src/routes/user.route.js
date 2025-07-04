import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {getMyFriends, getRecommendedUsers } from "../controllers/user.controller.js";

const router = express.Router();

//will apply auth middleware to all routes

router.use(protectRoute);
//routers will get recommended users and current friends

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);

export default router;