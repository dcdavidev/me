import { randomInt } from 'node:crypto';

import type { Request, Response } from 'express';

import { mailer } from '@repo/server-configs';
import { prisma } from '@repo/server-models';
import { EMAIL_USER } from '@repo/server-schemas';

/**
 * Handles the logic to request a One-Time Password login.
 *
 * It validates the system email, generates a code, saves it to the database,
 * and triggers the email sending service.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 */
export async function requestOtp(req: Request, res: Response): Promise<void> {
  const body = req.body;
  const systemEmail = process.env.SU_EMAIL;

  // 1. Validate Input Presence
  if (!body || !body.email || typeof body.email !== 'string') {
    res.status(400).json({
      message: 'Richiesta non valida: indirizzo email obbligatorio.',
    });
    return;
  }

  const { email } = body;

  // Authorization Check
  // Compares input email with the allowed system email (SU_EMAIL).
  if (email !== systemEmail) {
    res.status(401).json({
      message: 'Accesso negato: email non autorizzata.',
    });
    return;
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

    // Prepare Email
    const mailMessage = {
      from: EMAIL_USER,
      to: email,
      subject: 'Il tuo codice di accesso ad Admin',
      text: `Il tuo codice di verifica è: ${code}. Questo codice scade tra 15 minuti.`,
      html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Codice di Verifica</h2>
            <p>Usa il seguente codice per accedere al pannello di amministrazione:</p>
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #000;">
              ${code}
            </p>
            <p>Questo codice scade tra <strong>15 minuti</strong>.</p>
            <hr />
            <p style="font-size: 12px; color: #777;">Se non hai richiesto questo codice, ignora questa email.</p>
          </div>
        `,
    };

    // Send Email
    mailer.sendMail(mailMessage, (error, _info) => {
      if (error) {
        res.status(500).json({
          message: 'Errore interno: impossibile inviare email.',
        });
      } else {
        res.status(200).json({
          message: 'Codice inviato correttamente.',
        });
      }
    });
  } catch {
    res.status(500).json({
      message: 'Errore interno durante la generazione del codice.',
    });
  }
}
