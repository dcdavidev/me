/**
 * Sends an email with the One-Time Password.
 * Currently logs to console. Replace with your actual email provider logic.
 *
 * @param to - The recipient email address.
 * @param code - The OTP code to send.
 * @returns A promise that resolves when the email is sent.
 */
export async function sendOtpEmail(to: string, code: string): Promise<void> {
  // TODO: Integrate with Nodemailer here.
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEV] OTP for ${to}: ${code}`);
  }
  // Example: await resend.emails.send({ ... })
}
