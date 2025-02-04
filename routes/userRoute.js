import express from "express";
import { signup,RenderHome} from "../controller/userController.js";
import { googleAuth, googleAuthCallback } from '../controller/authController.js'



const router = express.Router();
router.post('/signup', signup);
router.get("/home",RenderHome);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);


export default router;


