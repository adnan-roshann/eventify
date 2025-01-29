import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
    const { username, email, password, confirm_password,gender} = req.body;
   console.log(req.body);
   
     // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    console.log('working');}
};

const existingUser = await user.findOne({username });
if (existingUser) {
    return res.status(400).json({ message: 'username already in use' });
}
console.log(existingUser);
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${username}`;
const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

const newUser = new user({
    username,
    email,
    password: hashedPassword,
    confirm_password: hashedPassword,
    gender,
    profilePic:gender === "male" ? boyProfilePic : girlProfilePic,
});
console.log(newUser,'jbjhjh');
