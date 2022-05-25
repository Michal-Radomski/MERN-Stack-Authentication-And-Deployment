const jwt = require("jsonwebtoken");
import {Request, Response, NextFunction} from "express";

interface Decode {
  _id: string;
  iat: number;
  exp: number;
}

export interface IUserRequest extends Request {
  user: Decode;
}

// Authenticate user middleware
exports.requireLogin = (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization) {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];
      // console.log({token});
      // Verify token
      const decode: Decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log({decode});
      // Attach token with request
      req.user = decode;
      // console.log("req.user:", req.user);
      next();
    } else {
      return res.status(400).json({message: "Unauthorized"});
    }
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
    console.log("Job done - auth");
  }
};
