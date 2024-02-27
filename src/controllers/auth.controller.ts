import { Request, Response } from "express";
import { findUniqueUser } from "../services/user.service";
import { PassowrdProtection } from "../utils/encryption";
import Token from "../utils/token";

interface LoginInput {
  email: string;
  password: string;
}

class AuthController {
  static loginController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { email, password }: LoginInput = req.body as unknown as LoginInput;
    const user = await findUniqueUser({ email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await PassowrdProtection.checkPassword(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const data = {
      userId: user.id,
      role: user.role,
    };

    const token = Token.generateToken(data, {
      secret: "ROBERTSUPERENGINEERXXXXXXXXXXXXXXXXXXXGOGLE",
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  };
}

export default AuthController;
