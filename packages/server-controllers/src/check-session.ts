import type { NextFunction, Request, Response } from 'express';

import { verifyToken } from '@repo/server-services';

/**
 * Checks if the user has a valid session cookie.
 * Used by the frontend to protect routes.
 */
export async function checkSession(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      res.status(401).json({ authenticated: false });
      return;
    }

    // Verify token throws if invalid/expired
    const payload = verifyToken(token);

    res.status(200).json({ authenticated: true, user: payload });
  } catch {
    res.status(401).json({ authenticated: false });
  }
}
