import { z } from 'zod';

export const emailHostSchema = z.string().optional();

export type EmailHost = z.infer<typeof emailHostSchema>;
export type EmailHostInput = z.input<typeof emailHostSchema>;
export type EmailHostOutput = z.output<typeof emailHostSchema>;

export const EMAIL_HOST = (() => {
  const parsed = emailHostSchema.safeParse(process.env.EMAIL_HOST);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_HOST value', { cause: parsed.error });
  }

  return parsed.data;
})();
