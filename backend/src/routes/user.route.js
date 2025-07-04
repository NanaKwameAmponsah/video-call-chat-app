import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    acceptFriendRequest,
    getMyFriends, 
    getRecommendedUsers, 
    sendFriendRequest
 } from "../controllers/user.controller.js";

const router = express.Router();

//will apply auth middleware to all routes

router.use(protectRoute);
//routers will get recommended users and current friends

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);
router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);// put instead of post because we are trying to update some field

export default router;