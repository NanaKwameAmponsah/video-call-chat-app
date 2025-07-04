import User from "../models/User";


export async function getRecommendedUsers(req, res) {

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user

        const getRecommendedUsers = await User.find({
            $and: [
                {_id:{$ne: currentUserId}}, //exclude current user
                {$id: {$nin: currentUser.friends}}, //exclude current user's friends
                {isOnboarded: true}// only want to see onboarded users
            ]
        })
        res.status(200).json({recommendedUsers})
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