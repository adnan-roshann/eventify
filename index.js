import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/userRoute.js";

dotenv.config();

const port = process.env.PORT || 3002
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user',router);
app.set('view engine','ejs');

connectDB();

app.listen(port,()=>{
    console.log(`port running on ${port}`);
    
});