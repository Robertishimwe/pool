import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';

interface CustomRequest extends Request {
  user?: User;
}

export const isOwner = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { user } = req;

  if (!user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  if (id !== user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};


