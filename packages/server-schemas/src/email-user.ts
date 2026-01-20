import { z } from 'zod';

export const emailUserSchema = z.string().min(1);

export type EmailUser = z.infer<typeof emailUserSchema>;
export type EmailUserInput = z.input<typeof emailUserSchema>;
export type EmailUserOutput = z.output<typeof emailUserSchema>;

export const EMAIL_USER = (() => {
  const parsed = emailUserSchema.safeParse(process.env.EMAIL_USER);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_USER value', { cause: parsed.error });
  }

  return parsed.data;
})();
