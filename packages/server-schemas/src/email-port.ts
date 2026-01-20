import { z } from 'zod';

const $emailPortSchemaString = z.string().min(1).max(5);
const $emailPortSchemaNumber = z.number().int().min(1).max(65_535);

export const emailPortSchema = z
  .union([$emailPortSchemaString, $emailPortSchemaNumber])
  .optional()
  .default(587);

export type EmailPort = z.infer<typeof emailPortSchema>;
export type EmailPortInput = z.input<typeof emailPortSchema>;
export type EmailPortOutput = z.output<typeof emailPortSchema>;

export const EMAIL_PORT = (() => {
  const parsed = emailPortSchema.safeParse(process.env.EMAIL_PORT);

  if (!parsed.success) {
    throw new Error('Invalid EMAIL_PORT value.', { cause: parsed.error });
  }

  return typeof parsed.data === 'string'
    ? Number.parseInt(parsed.data, 10)
    : parsed.data;
})();
