import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@repo/server-schemas';

/**
 * Verifies a JWT token.
 *
 * @param token - The token string to verify.
 * @returns The decoded payload if valid, otherwise throws.
 */
export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET as string);
}
