import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/Cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
    return res.status(201).json({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing email, password, or role",
        success: false,
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // Check if the password matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // Check if the role matches
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with the provided role",
        success: false,
      });
    }

    // Create JWT token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Define user data to send in the response
    const userData = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Send response with cookie
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Correctly set to prevent JavaScript access
        sameSite: "strict", // Prevent cross-site request forgery
      })
      .json({
        message: `Welcome back ${userData.fullName}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the cookie used for authentication
    res.clearCookie("token", {
      httpOnly: true, // Ensure JavaScript cannot access the cookie
      sameSite: "strict", // Helps prevent CSRF attacks
      secure: process.env.NODE_ENV === "production", // Only set cookie over HTTPS in production
    });

    // Respond with success message
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error); // Log error details for debugging
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    const fileUrl = await getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);

    // Convert skills to an array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    // Get user ID from authenticated request
    const userId = req.id; // Assumes `req.id` is set by middleware

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update user profile
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    // Save the updated user
    await user.save();

    // Respond with updated user data
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error(error); // Use console.error for error logging
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
