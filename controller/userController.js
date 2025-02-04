import user from "../model/userModel.js";
import bcrypt from "bcrypt";



// export const signup = async (req, res) => {
//     try {
//     const { name, email, password,gender} = req.body;
//    console.log(req.body);
   

   


// const existingUser = await user.findOne({email });
// if (existingUser) {
//     return res.status(400).json({ message: 'email already in use' });
// }
// console.log(existingUser, 'existing user');
// const hashedPassword = await bcrypt.hash(password, 10);
// console.log(hashedPassword);
// const boyProfilePic =`https://avatar.iran.liara.run/public/boy?username=${name}`;
// const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${name}`;

// const newUser = new user({
//     name,
//     email,
//     password: hashedPassword,
//     gender,
//     profilePic:gender === "male" ? boyProfilePic : girlProfilePic,
// });
// console.log(newUser,);
// await newUser.save();
// // res.status(201).json({ message: 'User registered successfully!' });
// res.redirect('/user/home');

// }catch (error) {
//     res.status(500).json({ message: 'Error registering user', error });
// }
// }

// export const RenderHome = async (req,res) =>{
//     res.render('home')

// }


// ------------------------------------------------------------------------------

const avatars = {
    Male: 'https://avatar.iran.liara.run/public/boy',
    Female: 'https://avatar.iran.liara.run/public/girl'
  };
  
  export const signup = async (req, res) => {
    const { name, email, password, gender } = req.body;

    const existingUser = await user.findOne({email });
if (existingUser) {
    return res.status(400).json({ message: 'email already in use' });
}
console.log(existingUser, 'existing user');
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
//   ..............................................................
    try {
      const avatar = avatars[gender] || avatars.Other;
      const user = new User({
         name,
          email,
          password: hashedPassword,
            gender,
             avatar });
    
             await User.save();
             // res.status(201).json({ message: 'User registered successfully!' });
             res.redirect('/user/home');
    } catch (err) {
      res.status(400).send('Error registering user',err);
    }
  };
  export const RenderHome = async (req,res) =>{
    res.render('home')

}




// ----------------------------------------------------------------------------------------------


