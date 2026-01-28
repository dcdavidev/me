import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@repo/server-schemas';

/**
 * Generates a signed JSON Web Token for the user.
 *
 * @param payload - The data to encode in the token.
 * @param payload.email - The email to encode in the token.
 * @returns The signed JWT string.
 */
export function signToken(payload: { email: string }): string {
  // Token expires in 7 days
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
