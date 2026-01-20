import { z } from 'zod';

import { PORT } from './port.js';

export const hostSchema = z
  .httpUrl()
  .optional()
  .default(`http://localhost:${PORT}`);

export type Host = z.infer<typeof hostSchema>;
export type HostInput = z.input<typeof hostSchema>;
export type HostOutput = z.output<typeof hostSchema>;

export const HOST = () => {
  const parsed = hostSchema.safeParse(process.env.HOST);

  if (!parsed.success) {
    throw new Error('Invalid HOST value', { cause: parsed.error });
  }

  return parsed.data;
};
