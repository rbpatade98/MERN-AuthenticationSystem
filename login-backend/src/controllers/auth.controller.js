import User from "../models/user.model.js";
import bcrypt  from "bcryptjs";
import jwt from "jsonwebtoken";

// GET /api/auth/
export const home = (req, res) => {
    res.status(200).json({message: "Backend Server is Running"});
};

//register

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Received registration data:", { username, email });
        // 1. Check if already registered
        const isAlreadyRegistered = await User.findOne({ $or: [{ email }, { username }] });
        if (isAlreadyRegistered) {
            return res.status(409).json({ message: "User already registered" });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create user
        const user = await User.create({ username, email, password: hashedPassword });

        // 4. Generate access token
        const accessToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "15m" }
        );

        res.status(201).json({ 
            message: "User registered successfully", 
            user: { username: user.username, email: user.email },
            accessToken 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//login
export const login = async (req, res) => {
  try {

    // get data from body
    const { email, password } = req.body;
    
    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {

    console.log("Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//logout
export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};