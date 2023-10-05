import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Model from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@description Auth user and get token
//@route Post /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  //deconstruct the data
  const { email, password } = req.body;
  //check for user in database
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    //set the json web token as a HTTP-Only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 25 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password");
  }
});

//@description Register user
//@route Post /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@description logout user and clear cookie
//@route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//@description get user profile
//@route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@description update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@description get all users
//@route Get /api/users
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get all users");
});

//@description get user by id
//@route Get /api/users/:id
//@access Private/admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@description delete users
//@route delete /api/users/:id
//@access Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user by id");
});

//@description update users
//@route PUT /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("UPDATE USER");
});

export {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  deleteUser,
  updateUser,
};
