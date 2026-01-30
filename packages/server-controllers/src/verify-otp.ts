import type { NextFunction, Request, Response } from 'express';

import { prisma } from '@repo/server-models';
import { signToken } from '@repo/server-services';

/**
 * Verifies the One-Time Password provided by the user.
 * It checks if the code exists and is not expired.
 * If valid, it deletes the OTP record to prevent replay attacks and authorizes the user.
 *
 * @param req - The Express request object, expecting `email` and `code` in the body.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export async function verifyOtp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, code } = req.body;

    // Input Validation
    if (!email || !code || typeof code !== 'string') {
      res.status(400).json({ error: 'Email e codice sono obbligatori.' });
      return;
    }

    // Database Lookup
    // We look for a matching record
    const otpRecord = await prisma.oneTimePassword.findFirst({
      where: {
        email,
        code,
      },
    });

    // Validation Logic
    if (!otpRecord) {
      // Generic error to avoid revealing if the code was wrong or email didn't exist
      res.status(400).json({ error: 'Codice non valido o scaduto.' });
      return;
    }

    // Check expiration
    if (new Date() > otpRecord.expiresAt) {
      // Clean up expired record immediately
      await prisma.oneTimePassword.delete({ where: { id: otpRecord.id } });
      res
        .status(400)
        .json({ error: 'Code has expired. Please request a new one.' });
      return;
    }

    // Success: Cleanup & Auth
    // Delete the used OTP so it cannot be used again (Replay Attack Prevention)
    await prisma.oneTimePassword.delete({ where: { id: otpRecord.id } });

    // Generate JWT
    const token = signToken({ email });

    res.status(200).json({
      message: 'Login effettuato.',
      token,
      expiresIn: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    next(error);
  }
}
