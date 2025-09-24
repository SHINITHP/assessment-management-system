import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { userId: string; email: string; };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction)=> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; email: string };
    req.user = decoded;
    next();
  } catch (error: any) {
    console.log(error)
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

