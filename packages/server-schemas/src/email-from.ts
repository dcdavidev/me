import { z } from 'zod';

import { EMAIL_USER } from './email-user.js';

export const emailFromSchema = z.string().optional().default(EMAIL_USER);

export type EmailFrom = z.infer<typeof emailFromSchema>;
export type EmailFromInput = z.input<typeof emailFromSchema>;
export type EmailFromOutput = z.output<typeof emailFromSchema>;

export const EMAIL_FROM = () => {
  const parsed = emailFromSchema.safeParse(process.env.EMAIL_FROM);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_FROM value', { cause: parsed.error });
  }

  return parsed.data;
};
