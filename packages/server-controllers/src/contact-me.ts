import type { Request, Response } from 'express';

import { mailer } from '@repo/server-configs';
import { EMAIL_USER } from '@repo/server-schemas';

/**
 * Handles the contact me form submission.
 *
 * Validates that the request body contains a name, email, and message.
 * If valid, sends an email to the configured user.
 * @param req The Express request object.
 * @param res The Express response object.
 * @example
 * app.post('/contact-me', contactMeController);
 */
export function contactMe(req: Request, res: Response): void {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    res.status(400).json({ message: 'Bad Request: Body is required.' });
    return;
  }

  const { name, email, message } = body;

  if (!name || !email || !message) {
    res
      .status(400)
      .json({ message: 'Bad Request: name, email, and message are required.' });
    return;
  }

  const mailMessage = {
    from: EMAIL_USER,
    to: EMAIL_USER,
    subject: `IO: ${name} has sent you a message.`,
    text: message,
  };

  mailer.sendMail(mailMessage, (error, _info) => {
    if (error) {
      res
        .status(500)
        .json({ message: 'Internal Server Error: Failed to send email.' });
    } else {
      res.status(200).json({ message: 'Email sent successfully.' });
    }
  });
}
