import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as { id: number, role: 'USER' | 'SELLER' };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export const authorizeSeller = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'SELLER') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
