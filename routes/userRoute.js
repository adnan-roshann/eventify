import express from "express";
import { signup,RenderHome} from "../controller/userController.js";

const router = express.Router();
router.post('/signup', signup);
router.get("/home",RenderHome);


export default router;


