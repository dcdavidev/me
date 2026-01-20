import { z } from 'zod';

export const emailPasswordSchema = z.string().min(1);

export type EmailPassword = z.infer<typeof emailPasswordSchema>;
export type EmailPasswordInput = z.input<typeof emailPasswordSchema>;
export type EmailPasswordOutput = z.output<typeof emailPasswordSchema>;

export const EMAIL_PASSWORD = (() => {
  const parsed = emailPasswordSchema.safeParse(process.env.EMAIL_PASSWORD);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_PASSWORD value', { cause: parsed.error });
  }

  return parsed.data;
})();
