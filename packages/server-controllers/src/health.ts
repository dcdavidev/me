import type { Request, Response } from 'express';

/**
 * Handles the health check request.
 * Returns a 200 OK response with a message indicating the server is running.
 * @param _req The Express request object.
 * @param res The Express response object.
 * @example
 * app.get('/health', health);
 */
export function health(_req: Request, res: Response) {
  res.status(200).json({ message: 'OK' });
}
