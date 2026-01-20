import { z } from 'zod';

export const emailSecureSchema = z
  .union([z.boolean(), z.string(), z.number()])
  .optional()
  .default(false);

export type EmailSecure = z.infer<typeof emailSecureSchema>;
export type EmailSecureInput = z.input<typeof emailSecureSchema>;
export type EmailSecureOutput = z.output<typeof emailSecureSchema>;

export const EMAIL_SECURE = (() => {
  const parsed = emailSecureSchema.safeParse(process.env.EMAIL_SECURE);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_SECURE value.', { cause: parsed.error });
  }

  const value = parsed.data;

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true' || value === '1') return true;
    if (lower === 'false' || value === '0') return false;
  } else if (typeof value === 'number') {
    if (value === 1) return true;
    if (value === 0) return false;
  }

  throw new Error(`Invalid EMAIL_SECURE value: ${value}`);
})();
