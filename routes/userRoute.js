import express from "express";
import { signup,RenderHome,verifyOTP} from "../controller/userController.js";
import passport from 'passport';



const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.post('/signup', signup);
router.get("/home",RenderHome);
router.post('/verify-otp', verifyOTP); 

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/user/home'); // Redirect after successful login
  }
);



export default router;


