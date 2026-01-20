import { z } from 'zod';

export const environmentSchema = z.string().optional().default('local');

export type Environment = z.infer<typeof environmentSchema>;
export type EnvironmentInput = z.input<typeof environmentSchema>;
export type EnvironmentOutput = z.output<typeof environmentSchema>;

export const ENVIRONMENT = () => {
  const parsed = environmentSchema.safeParse(process.env.ENVIRONMENT);

  if (!parsed.success) {
    throw new Error('Invalid ENVIRONMENT value', { cause: parsed.error });
  }

  return parsed.data;
};
