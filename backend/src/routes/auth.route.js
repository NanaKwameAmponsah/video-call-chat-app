import express from "express"
import { login, logout, signup , onboard, updateProfile} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; 
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);//post because post methods are for operations that change the server state (e.g logging out destroys a session and invalidates a token)

router.post("/onboarding", protectRoute, onboard);
router.put("/profile", protectRoute, updateProfile);
//checks if user is logged in or not
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user});
});

export default router;