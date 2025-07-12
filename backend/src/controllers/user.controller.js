import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";



export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user

        const recommendedUsers = await User.find({
            $and: [
                {_id:{$ne: currentUserId}}, //exclude current user
                {_id: {$nin: currentUser.friends}}, //exclude current user's friends
                {isOnboarded: true}// only want to see onboarded users
            ],
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);

        res.status(500).json({ message: "Internal Server Error"});
        
    }
}

export async function getMyFriends(req, res) {
    try {
        //used populate method to grab the data from the user array
       const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic yourBeliefsPhilosophy curiousAbout");
       res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
        
    }

}
export async function sendFriendRequest(req, res) {
    try {
        //get my id and recipient id
        const myId = req.user.id;
        const {id: recipientId} = req.params;

        //prevent sending friend requests to yourself
        if (myId === recipientId) {
            return res.status(400).json({message: "You can't send friend request to yourself"});
        }

        //check if friend request recipient exists
        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({ message: "User not found"})

        }
        //check if user is already friends
        if (recipient.friends.includes(myId)){
            return res.status(400).json({ message: "You are already friends with this user"});

        }
        //check if a request already exists
        const existingRequest = await FriendRequest.findOne({
            //if any of these cases are true, we have an existing request 
            $or: [
                {sender:myId, recipient:recipientId},
                {sender: recipientId, recipient:myId}
            ],
        });

        if (existingRequest){
            return res.status(400).json({ message: "A friend request already exists between you and this user"});
        }
        //finally, if all those checks go through, create a friend request
        const newRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,

        });
        res.status(200).json(FriendRequest);





    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
        
    }

}

export async function acceptFriendRequest(req, res){
    try {
        const {id: requestId} = req.params
        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({ message: "Friend request not found"});
        }
        //verify the current user is the recipient
        if (friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({ message: "You're not authorized to accept this request"});
        }
        //if all checks fly, accept friend request and save to database
        friendRequest.status = "accepted";
        await friendRequest.save();
        //add current user id to recipient user friends list
        //$addToSet adds elements to an array only if it doesn't exist already

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender},
        });
        //add recipient user id to current user friends list
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient},
        });
        res.status(200).json({ message: "Friend request accepted"});
    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
        
    }
}

export async function getFriendRequests(req, res){
    try {
        const incomingReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",

        }).populate("sender", "fullName profilePic yourBeliefsPhilosophy curiousAbout");

        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingReqs, acceptedReqs})
    } catch (error) {
        console.log("Error in getPendingFriendRrequests controller", error.message);
        res.status(500).json({ message: "Internal Server Error"})   
    }
}

export async function getOutgoingFriendReqs(req, res){
    try {
        const outgoingRequests = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",

        }).populate("recipient", "fullName profilePic yourBeliefsPhilosophy curiousAbout");

        res.status(200).json(outgoingRequests);
    } catch (error) {
        console.log("Error in getOutgoingFriendReqs controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});
        
    }
}