import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String,require:true},
    email: {type:String,require:true},
    password:{type:String,require:true},
    confirm_password:{type:String,require:true},
    gender: { type: String, enum: ["male", "female"]}
})

const user = mongoose.model('user',userSchema);
export default user