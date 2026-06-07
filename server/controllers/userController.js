// import User from "../models/User.js"
// import bcrypt from 'bcrypt'
// import jwt from "jsonwebtoken";


// const gernerateToken = (userId) =>{
//     const token = jwt.sign({userId} , process.env.JWT_SECRET,{expiresIn: '7d'})
//     return token;
// }
// // Controller for user register
// //POST : /api/users/register

// export const registerUser = async (req , res)=>{
//     try {
//         console.log(req.body)
//         const{name,email,password} = req.body;

//         if(!name || !email || !password){
//             return res.status(400).json({message: 'Missing required fields'
//             })
//         }

//         //check if user already exits
//       const user = await User.findOne({email})
//       if(user){
//         return res.status(400).json({message: 'User already exists'
//             })
//       }

//       //create new user
//       const hashedPassword = await bcrypt.hash(password,10)
//       const newUser = await User.create({
//         name, email,password:hashedPassword
//       })

//       //return success message
//       const token = gernerateToken(newUser._id)
//       newUser.password = undefined;

//       return res.status(201).json({message: 'User created successfully' ,token, user:newUser})
        
//     } catch (error) {

//         return res.status(400).json({message: error.message})
//     }

// }

//    // Controller for user login
//     //POST : /api/users/login
// export const loginUser = async (req , res)=>{
//     try {
//         const{email,password} = req.body;

//         //check if user exits
//       const user = await User.findOne({email})
//       if(!user){
//         return res.status(400).json({message: 'Invalid email or password' })
//       }

//       //check if password is correct
//      if(!user.comparePassword(password)){
//         return res.status(400).json({message: 'Invalid email or password'})
//      }

//       //return success message
//       const token = gernerateToken(user._id)
//       user.password = undefined;

//       return res.status(200).json({message: 'Login successfully' ,token, user})
        
//     } catch (error) {

//         return res.status(400).json({message: error.message})
//     }

// }

// // controller for getting user by id 
// // GET: /api/users/data
// export const getUserById = async (req , res)=>{
//     try {
//        const userId = req.userId;
     
//       // check if user exists
//       const user = await User.findById(userId)
//       if(!user){
//         return res.status(404).json({message:'User not found '})
//       }

//       // return user
//       user.password = undefined;
//      return res.status(200).json({user})
        
//     } catch (error) {

//         return res.status(400).json({message: error.message})
//     }

// }



import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER USER =================
// POST : /api/users/register

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = generateToken(newUser._id);

    // Remove password from response
    newUser.password = undefined;

    // Success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });

  } catch (error) {

    console.log("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN USER =================
// POST : /api/users/login

export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Remove password
    user.password = undefined;

    // Success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {

    console.log("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET USER DATA =================
// GET : /api/users/data

export const getUserById = async (req, res) => {
  try {

    const userId = req.userId;

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove password
    user.password = undefined;

    // Success response
    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log("Get User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
