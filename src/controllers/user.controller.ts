import { Request, Response } from 'express';

import { createUser } from "../services/user.service";
import { PassowrdProtection } from "../utils/encryption";

interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }


class UsersController {
  //create account
  static createUserController = async (req:Request, res:Response): Promise<void> => {

    const { firstName, lastName, email, password }: UserInput = req.body as unknown as UserInput;
    const hashedPassword = await PassowrdProtection.hashPassword(password);
    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const newUser = await createUser(user)
    console.log(newUser)
    return newUser
  };

}

export default UsersController;