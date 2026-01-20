import { z } from 'zod';

const $portSchemaString = z.string().min(4).max(5);
const $portSchemaNumber = z.number().int().min(1024).max(65_535);

export const portSchema = z
  .union([$portSchemaString, $portSchemaNumber])
  .optional()
  .default(3000);

export type Port = z.infer<typeof portSchema>;
export type PortInput = z.input<typeof portSchema>;
export type PortOutput = z.output<typeof portSchema>;

export const PORT = (() => {
  const parsed = portSchema.safeParse(process.env.PORT);

  if (!parsed.success) {
    throw new Error('Invalid PORT value.', { cause: parsed.error });
  }

  return typeof parsed.data === 'string'
    ? Number.parseInt(parsed.data, 10)
    : parsed.data;
})();
