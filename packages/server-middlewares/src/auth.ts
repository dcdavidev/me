import { type NextFunction, type Request, type Response } from 'express';

import { verifyToken } from '@repo/server-services';

interface AuthenticatedRequest extends Request {
  /** The decoded user payload from JWT */
  user?: string | object;
}

/**
 * Verifies the presence and validity of the auth_token cookie.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.cookies?.auth_token;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized: No token provided.' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    // Attach user info to the request for downstream use if needed
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token.' });
  }
}
