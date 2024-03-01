import { Request as ExpressRequest } from 'express';
import { Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { findUniqueUser } from "../services/user.service";
import Token from "../utils/token"

interface DecodedToken {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

interface CustomRequest extends ExpressRequest {
  user?: any;
}

const Verify = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).send({ message: "You are not allowed to access this page" });
  }

  try {
    const decoded = Token.verifyToken(token, "ROBERTSUPERENGINEERXXXXXXXXXXXXXXXXXXXGOGLE") as DecodedToken;
    const userId = decoded.userId;

    // Check for user existence in the database
    const user = await findUniqueUser({ id: userId });

    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    if(user?.isBlocked){
      return res.status(401).send({ message: "You were blocked by the administrator" });
    }

    if(!user?.isActive){
      return res.status(401).send({ message: "Your account is not active" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).send({ message: "Invalid token" });
  }
};

export default Verify;
