import type { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

/**
 * Checks if the user has a valid session token provided in the request body.
 * Used by the frontend to protect routes.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param _next - The Express next function.
 */
export async function checkSession(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(401).json({ authenticated: false, message: 'Token missing' });
      return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const payload = jwt.verify(token, secret);

    res.status(200).json({
      authenticated: true,
      user: payload,
    });
  } catch {
    // jwt.verify throws error if token is expired or invalid
    res.status(401).json({
      authenticated: false,
      message: 'Invalid or expired token',
    });
  }
}
