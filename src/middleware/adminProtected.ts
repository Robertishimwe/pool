import { Response, NextFunction } from 'express';
import { Request as ExpressRequest } from 'express';
import { Role } from '@prisma/client';

interface CustomRequest extends ExpressRequest {
  user?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role | null;
  };
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { user } = req;

  if (!user || user.role !== Role.ADMIN) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
