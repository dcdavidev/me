import { z } from 'zod';

// Let EMAIL_SERVICE be optional; some providers don't require it.
export const emailServiceSchema = z.string().optional();

export type EmailService = z.infer<typeof emailServiceSchema>;
export type EmailServiceInput = z.input<typeof emailServiceSchema>;
export type EmailServiceOutput = z.output<typeof emailServiceSchema>;

export const EMAIL_SERVICE = (() => {
  const parsed = emailServiceSchema.safeParse(process.env.EMAIL_SERVICE);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_SERVICE value', { cause: parsed.error });
  }

  return parsed.data;
})();
