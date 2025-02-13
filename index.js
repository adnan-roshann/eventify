import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/userRoute.js";
import session from 'express-session';
import passport from 'passport';


dotenv.config();

const port = process.env.PORT || 3002
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',router);
app.set('view engine','ejs');

app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', router);

connectDB();

app.listen(port,()=>{
    console.log(`port running on ${port}`);
    
});