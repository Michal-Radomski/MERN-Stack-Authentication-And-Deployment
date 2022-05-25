const router = require("express").Router();
import {Request, Response} from "express";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const {requireLogin} = require("../middleware/auth");
import {IUserRequest} from "../middleware/auth";
const JWT_SECRET = process.env.JWT_SECRET as string;
// console.log({JWT_SECRET});

interface USER {
  _id: string;
  name: string;
  email: string;
  password: string;
  save(): void;
}

// Register user
router.post("/register", async (req: Request, res: Response) => {
  const {name, email, password}: {name: string; email: string; password: string} = req.body;
  try {
    let user: USER = await User.findOne({email: email});
    // console.log("no user:", {user});
    if (user) {
      return res.status(400).json({error: "User already exists"});
    }
    const hashed_password: string = await bcrypt.hash(password, 10);
    user = new User({
      name: name,
      email: email,
      password: hashed_password,
    });
    // console.log({user});
    await user.save();
    return res.status(201).json({message: "User created successfully"});
  } catch (error) {
    // console.log({error});
    return res.status(400).json({error: (error as Error).message});
  } finally {
    console.log("Job done - register");
  }
});

// Login user
router.post("/login", async (req: Request, res: Response) => {
  const {email, password} = req.body;
  try {
    let user: USER = await User.findOne({email: email});
    // console.log({user});
    if (!user) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);
    // console.log("isMatch:", isMatch, typeof isMatch);
    if (!isMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    const token: string = jwt.sign({_id: user._id}, JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log("token:", token, typeof token);

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // console.log({error});
    return res.status(400).json({error: (error as Error).message});
  } finally {
    console.log("Job done - login");
  }
});

// Get logged in user
router.get("/", requireLogin, async (req: IUserRequest, res: Response) => {
  // console.log({req}, {res});
  // console.log("req.user:", req.user);
  try {
    const user: USER = await User.findById(req.user._id).select("-password -__v");
    // console.log({user});
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: (error as Error).message});
  } finally {
    console.log("Job done - logged in user");
  }
});

module.exports = router;
