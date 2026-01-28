import { randomInt } from 'node:crypto';

import { prisma } from '@repo/server-models';
import { sendOtpEmail } from '@repo/server-services';

/**
 * Handles the logic to request a One-Time Password login.
 * It validates the system email, generates a code, saves it to the database,
 * and triggers the email sending service.
 *
 * @param email - The email address provided by the user.
 * @returns A result object indicating success or failure message.
 */
export async function requestOtp(email: string) {
  // Strict System Email Check
  const systemEmail = process.env.SU_EMAIL;

  if (!email || typeof email !== 'string') {
    return { success: false, error: 'Email obbligatoria.' };
  }

  // Security: If email doesn't match, we can either return a generic error
  // or silent success to prevent enumeration. Since this is a private app,
  // returning a specific error is acceptable for debugging.
  if (email !== systemEmail) {
    return { success: false, error: 'Email non autorizzata.' };
  }

  // Generate OTP (6 digits)
  const code = randomInt(100_000, 999_999).toString();
  const expiresInMinutes = 15;
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  try {
    // Save to Database
    await prisma.oneTimePassword.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });

    // Send Email
    await sendOtpEmail(email, code);

    return { success: true };
  } catch {
    return { success: false, error: 'Impossibile generare codice OTP.' };
  }
}
