import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    acceptFriendRequest,
    getFriendRequests,
    getMyFriends, 
    getOutgoingFriendReqs,
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
router.get("/friend-requests", getFriendRequests);//want to be able to see all the friend requests that are pending
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);//want to check if we've already sent a request to a user 


export default router;