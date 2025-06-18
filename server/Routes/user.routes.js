import {Router} from "express"
import {register,login,logout,getProfile, updateUser} from "../Controllers/user.controller.js"
import upload from "../middlewares/multer.middleware.js";
import {isLoggedIn} from "../middlewares/auth.middlewares.js"

const router = Router();

router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.post('/logout',isLoggedIn,logout);
router.get('/profile',isLoggedIn,getProfile);
router.put('/update/:id',isLoggedIn,upload.single("avatar"),updateUser)


export default router;