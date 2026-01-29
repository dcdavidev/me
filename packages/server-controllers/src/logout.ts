import type { Request, Response } from 'express';

/**
 * Handles user logout by clearing the authentication cookie.
 * * Since we are using JWT-based cookies instead of server-side sessions,
 * we simply instruct the client to delete the 'auth_token' cookie.
 *
 * @param _req - The Express request object (unused).
 * @param res - The Express response object.
 */
export const logout = (_req: Request, res: Response) => {
  const isProd = process.env.NODE_ENV === 'production';

  // Clear the JWT cookie
  // Note: path and sameSite should match the options used during login
  res.clearCookie('auth_token', {
    path: '/',
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logout effettuato con successo.' });
};
